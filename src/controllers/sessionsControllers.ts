import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { z } from 'zod';
import { comparePassword } from '@/utils/hashPassword';
import { authConfig } from '@/configs/auth';
import { sign } from 'jsonwebtoken';

class SessionController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) throw new AppError('Invalid Credentials', 401);

    await comparePassword(password, user.password);

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role ?? 'customer' }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}

export { SessionController };
