import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      delivery_id: z.uuid(),
      description: z.string().max(200),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!delivery) throw new AppError('Delivery Not Found', 404);
    if (delivery.status === 'processing')
      throw new AppError('Change status to Shipped to make a log', 404);

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.json({ message: 'ok' });
  }
}

export { DeliveryLogsController };
