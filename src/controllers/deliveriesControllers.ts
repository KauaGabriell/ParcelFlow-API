import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '../database/prisma';

class DeliveriesController {
  async create(request: Request, response: Response, next: NextFunction) {
    response.json({ message: 'ok' });
  }
}

export { DeliveriesController };
