"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in .env file');
}
exports.default = {
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};
//# sourceMappingURL=drizzle.config.js.map