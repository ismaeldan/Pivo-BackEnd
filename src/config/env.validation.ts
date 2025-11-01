import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION: z.coerce.number().min(1),

  DATABASE_URL: z.string().url().min(1),
});