import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION: z.coerce.number().min(1),

  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
});