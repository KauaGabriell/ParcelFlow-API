import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional(),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
