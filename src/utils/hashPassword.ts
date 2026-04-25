import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const rounds = 12;

  const hash = await bcrypt.hash(password, rounds);
  return hash;
}
