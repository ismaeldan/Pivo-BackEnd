"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const postgres_1 = __importDefault(require("postgres"));
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in .env file');
}
console.log('Running migrations...');
const migrationClient = (0, postgres_1.default)(process.env.DATABASE_URL, { max: 1 });
const db = (0, postgres_js_1.drizzle)(migrationClient);
async function runMigrations() {
    try {
        await (0, migrator_1.migrate)(db, { migrationsFolder: './src/db/migrations' });
        console.log('Migrations applied successfully!');
        await migrationClient.end();
        process.exit(0);
    }
    catch (err) {
        console.error('Error applying migrations:', err);
        await migrationClient.end();
        process.exit(1);
    }
}
runMigrations();
//# sourceMappingURL=migrate.js.map