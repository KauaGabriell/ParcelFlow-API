import bcrypt from 'bcrypt';
import { AppError } from './AppError';

export async function hashPassword(password: string) {
  const rounds = 12;

  const hash = await bcrypt.hash(password, rounds);
  return hash;
}

export async function comparePassword(password: string, hash?: string) {
  if (!hash) throw new AppError('Invalid Credentials', 401);

  const comparedPassword = await bcrypt.compare(password, hash);

  if (!comparedPassword) throw new AppError('Invalid Credentials', 401);

  return comparedPassword;
}
