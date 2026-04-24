import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { hashPassword } from '@/utils/hashPassword';

class UserController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const hashedPassword = hashPassword(password);

    return response.json({ name, email, hashedPassword });
  }
}

export { UserController };
