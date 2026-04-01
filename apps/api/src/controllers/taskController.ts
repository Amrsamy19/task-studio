import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import {
  createTaskSchema,
  updateTaskSchema,
  createCommentSchema,
  taskQuerySchema,
} from "../lib/schemas";

export async function listTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = taskQuerySchema.parse(req.query);
    const result = await taskService.getTasks(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = createTaskSchema.parse(req.body);
    const task = await taskService.createTask(input);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = updateTaskSchema.parse(req.body);
    const task = await taskService.updateTask(req.params.id, input);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function archiveTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await taskService.archiveTask(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function addComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { message } = createCommentSchema.parse(req.body);
    const comment = await taskService.addComment(req.params.id, message);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}
