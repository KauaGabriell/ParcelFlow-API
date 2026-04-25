import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { verify } from 'jsonwebtoken';
import { authConfig } from '@/configs/auth';

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const headers = request.headers.authorization;
  if (!headers) throw new AppError('JWT token missing', 401);

  const [, token] = headers.split(' ');
  try {
    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;
    request.user = { id: user_id, role };

    next();
  } catch (error) {
    throw new AppError('Invalid JWT TOKEN', 401);
  }
}

export { ensureAuthentication };
