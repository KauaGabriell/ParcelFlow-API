import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import z, { ZodError } from 'zod';
import { Prisma } from '@/generated/prisma/client';

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: 'validation error', issues: z.treeifyError(error) });
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    return response.status(409).json({ message: 'Duplicate Recurse' });
  }

  return response.status(500).json({ message: error.message });
}
