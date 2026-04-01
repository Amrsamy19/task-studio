import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError(404, `Route ${req.method} ${req.path} not found`));
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      issues: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code ?? "APP_ERROR",
    });
  }

  // Unknown errors — log but don't expose internals
  console.error("[unhandled error]", err);
  return res.status(500).json({
    error: err.message || "An unexpected error occurred",
    code: "INTERNAL_ERROR",
    details: err instanceof Error ? err.stack : undefined,
  });
}
