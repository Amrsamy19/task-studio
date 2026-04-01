"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_API_URL) {
  console.error("❌ CRITICAL: NEXT_PUBLIC_API_URL is missing in the production environment!");
}

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(5000).optional(),
  status: z.enum(["BACKLOG", "IN_PROGRESS", "BLOCKED", "DONE"]).default("BACKLOG"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.string().optional().transform((v) => (v ? new Date(v).toISOString() : undefined)),
  assigneeIds: z.array(z.string()).optional(),
});

const updateTaskSchema = createTaskSchema.partial();

const commentSchema = z.object({
  message: z.string().min(1, "Comment cannot be empty").max(2000),
});

type ActionResult =
  | { success: true; data?: unknown }
  | { success: false; errors: Record<string, string[]> };

async function apiMutate(path: string, method: string, body: unknown) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
}

export async function createTaskAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate") || undefined,
    assigneeIds: formData.getAll("assigneeIds").filter(Boolean) as string[],
  };

  const parsed = createTaskSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    parsed.error.issues.forEach((i) => {
      const field = i.path[0] as string;
      errors[field] = [...(errors[field] ?? []), i.message];
    });
    return { success: false, errors };
  }

  try {
    await apiMutate("/tasks", "POST", parsed.data);
    revalidatePath("/tasks");
    return { success: true };
  } catch (err: unknown) {
    const e = err as { error?: string };
    return { success: false, errors: { _form: [e.error ?? "Failed to create task"] } };
  }
}

export async function updateTaskAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate") || undefined,
    assigneeIds: formData.getAll("assigneeIds").filter(Boolean) as string[],
  };

  const parsed = updateTaskSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    parsed.error.issues.forEach((i) => {
      const field = i.path[0] as string;
      errors[field] = [...(errors[field] ?? []), i.message];
    });
    return { success: false, errors };
  }

  try {
    await apiMutate(`/tasks/${id}`, "PATCH", parsed.data);
    revalidatePath("/tasks");
    revalidatePath(`/tasks/${id}`);
    return { success: true };
  } catch (err: unknown) {
    const e = err as { error?: string };
    return { success: false, errors: { _form: [e.error ?? "Failed to update task"] } };
  }
}

export async function archiveTaskAction(id: string): Promise<ActionResult> {
  try {
    await apiMutate(`/tasks/${id}/archive`, "PATCH", {});
    revalidatePath("/tasks");
    redirect("/tasks");
  } catch (err: unknown) {
    const e = err as { error?: string };
    return { success: false, errors: { _form: [e.error ?? "Failed to archive task"] } };
  }
}

export async function addCommentAction(
  taskId: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = { message: formData.get("message") };
  const parsed = commentSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    parsed.error.issues.forEach((i) => {
      const field = i.path[0] as string;
      errors[field] = [...(errors[field] ?? []), i.message];
    });
    return { success: false, errors };
  }

  try {
    await apiMutate(`/tasks/${taskId}/comments`, "POST", parsed.data);
    revalidatePath(`/tasks/${taskId}`);
    return { success: true };
  } catch (err: unknown) {
    const e = err as { error?: string };
    return { success: false, errors: { _form: [e.error ?? "Failed to add comment"] } };
  }
}
