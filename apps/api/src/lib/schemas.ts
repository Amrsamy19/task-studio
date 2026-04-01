import { z } from "zod";

export const StatusEnum = z.enum([
  "BACKLOG",
  "IN_PROGRESS",
  "BLOCKED",
  "DONE",
]);
export const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be under 200 characters"),
  description: z.string().max(5000).optional(),
  status: StatusEnum.optional().default("BACKLOG"),
  priority: PriorityEnum.optional().default("MEDIUM"),
  dueDate: z.coerce.date().optional().nullable(),
  assigneeIds: z.array(z.string().cuid("Invalid assignee ID")).optional().default([]),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be under 200 characters")
    .optional(),
  description: z.string().max(5000).optional().nullable(),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  dueDate: z.coerce.date().optional().nullable(),
  assigneeIds: z.array(z.string().cuid("Invalid assignee ID")).optional(),
});

export const createCommentSchema = z.object({
  message: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(2000, "Comment must be under 2000 characters"),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  assigneeId: z.string().optional(),
  archived: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional()
    .default("false"),
  search: z.string().max(200).optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "dueDate", "priority", "title"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type TaskQuery = z.infer<typeof taskQuerySchema>;
