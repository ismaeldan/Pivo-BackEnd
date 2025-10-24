import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
export declare const DB: unique symbol;
export type DbType = ReturnType<typeof drizzle<typeof schema>>;
export declare class DatabaseModule {
}
