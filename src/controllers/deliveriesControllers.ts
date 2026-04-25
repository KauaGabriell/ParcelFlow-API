import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '../database/prisma';
import { z } from 'zod';

class DeliveriesController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      user_id: z.uuid(),
      description: z.string().min(4),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    response.status(201).json(delivery);
  }
}

export { DeliveriesController };
