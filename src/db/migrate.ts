import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

console.log('Running migrations...');

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const db = drizzle(pool, { schema });

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations applied successfully!');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Error applying migrations:', err);
    await pool.end();
    process.exit(1);
  }
}

runMigrations();