import { z } from 'zod';

const envSchema = z.object({
  PORT: z.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
