import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function listUsers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}
