// src/db/migrate.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

console.log('Running migrations...');

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(migrationClient);

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations applied successfully!');
    await migrationClient.end();
    process.exit(0);
  } catch (err) {
    console.error('Error applying migrations:', err);
    await migrationClient.end();
    process.exit(1);
  }
}

runMigrations();