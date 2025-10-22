// src/db/drizzle.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DRIZZLE_PROVIDER_TOKEN = 'DRIZZLE_PROVIDER';

export const DrizzleProvider: Provider = {
  provide: DRIZZLE_PROVIDER_TOKEN,
  inject: [ConfigService], 
  useFactory: (configService: ConfigService) => { 
    const connectionString = configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }

    const client = postgres(connectionString);
    return drizzle(client, { schema });
  },
};