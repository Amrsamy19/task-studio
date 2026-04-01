export type Status = "BACKLOG" | "IN_PROGRESS" | "BLOCKED" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface User {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  message: string;
  taskId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  dueDate: string | null;
  archived: boolean;
  assignees: User[];
  createdAt: string;
  updatedAt: string;
  _count?: { comments: number };
}

export interface TaskDetail extends Task {
  comments: Comment[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  code: string;
  issues?: Array<{ field: string; message: string }>;
}

export type TaskFilters = {
  status?: Status;
  priority?: Priority;
  assigneeId?: string;
  archived?: boolean;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "dueDate" | "priority" | "title";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};
