import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRATION: z.ZodCoercedNumber<unknown>;
    DATABASE_HOST: z.ZodDefault<z.ZodString>;
    DATABASE_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_USER: z.ZodString;
    DATABASE_PASSWORD: z.ZodString;
    DATABASE_NAME: z.ZodString;
}, z.core.$strip>;
