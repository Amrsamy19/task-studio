import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  CreateTaskInput,
  UpdateTaskInput,
  TaskQuery,
} from "../lib/schemas";
import { AppError } from "../middleware/errorHandler";

// Priority ordering for sort
const PRIORITY_ORDER: Record<string, number> = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

export async function getTasks(query: TaskQuery) {
  const {
    page,
    limit,
    status,
    priority,
    assigneeId,
    archived,
    search,
    sortBy,
    sortOrder,
  } = query;

  const where: Prisma.TaskWhereInput = {
    archived,
    ...(status && { status }),
    ...(priority && { priority }),
    ...(assigneeId && { assignees: { some: { id: assigneeId } } }),
    ...(search && {
      OR: [
        { title: { contains: search } },
        { description: { contains: search } },
      ],
    }),
  };

  // For priority sort, we need to handle it in application layer (SQLite limitation)
  const isPrioritySort = sortBy === "priority";

  const [total, tasks] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      include: {
        assignees: { select: { id: true, name: true } },
        _count: { select: { comments: true } },
      },
      orderBy: isPrioritySort
        ? { createdAt: "desc" } // fallback; will re-sort below
        : { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: isPrioritySort ? undefined : limit, // fetch all for priority sort
    }),
  ]);

  let result = tasks;

  if (isPrioritySort) {
    result = tasks
      .sort((a, b) => {
        const diff =
          PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        return sortOrder === "asc" ? -diff : diff;
      })
      .slice((page - 1) * limit, page * limit);
  }

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTaskById(id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      assignees: { select: { id: true, name: true } },
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found", "TASK_NOT_FOUND");
  }

  return task;
}

export async function createTask(input: CreateTaskInput) {
  const { assigneeIds, ...data } = input;
  return prisma.task.create({
    data: {
      ...data,
      assignees: assigneeIds?.length ? { connect: assigneeIds.map((id) => ({ id })) } : undefined,
    },
    include: {
      assignees: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function updateTask(id: string, input: UpdateTaskInput) {
  await getTaskById(id); // throws 404 if not found

  const { assigneeIds, ...data } = input;
  return prisma.task.update({
    where: { id },
    data: {
      ...data,
      assignees: assigneeIds ? { set: assigneeIds.map((uid) => ({ id: uid })) } : undefined,
    },
    include: {
      assignees: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function archiveTask(id: string) {
  await getTaskById(id);
  return prisma.task.update({
    where: { id },
    data: { archived: true },
    select: { id: true, archived: true },
  });
}

export async function addComment(taskId: string, message: string) {
  await getTaskById(taskId);
  return prisma.comment.create({
    data: { taskId, message },
  });
}
