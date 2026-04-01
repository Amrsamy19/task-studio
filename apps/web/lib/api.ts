import {
  Task,
  TaskDetail,
  PaginatedResponse,
  User,
  TaskFilters,
} from "@/types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.log(body);
    throw new ApiError(
      res.status,
      body.error ?? "Request failed",
      body.code,
      body.issues,
    );
  }

  return res.json();
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public issues?: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Build query string from filters
function buildQuery(filters: TaskFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      params.set(key, String(val));
    }
  });
  const q = params.toString();
  return q ? `?${q}` : "";
}

// Tasks
export function getTasks(filters: TaskFilters = {}) {
  return apiFetch<PaginatedResponse<Task>>(`/tasks${buildQuery(filters)}`, {
    next: { revalidate: 30 },
  });
}

export function getTask(id: string) {
  return apiFetch<TaskDetail>(`/tasks/${id}`, {
    next: { revalidate: 30 },
  });
}

// Users
export function getUsers() {
  return apiFetch<User[]>(`/users`, { next: { revalidate: 300 } });
}
