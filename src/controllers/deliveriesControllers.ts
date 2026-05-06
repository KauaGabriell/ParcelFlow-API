import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../database/prisma.js';
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

  async index(request: Request, response: Response, next: NextFunction) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!deliveries) throw new AppError('Deliveries Not Found', 400);

    return response.status(200).json(deliveries);
  }

  async statusUpdate(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(['processing', 'shipped', 'delivered']),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    await prisma.delivery.update({
      where: { id },
      data: {
        status: status,
      },
    });

    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: status,
      },
    });

    return response.status(200).json({ message: 'Update successful' });
  }
}

export { DeliveriesController };
