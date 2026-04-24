import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const rounds = 12;

  const hash = bcrypt.hashSync(password, rounds);
  return hash;
}
