import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type DrizzleDatabase = ReturnType<typeof drizzle<typeof schema>>;