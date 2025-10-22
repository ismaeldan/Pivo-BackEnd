"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projects = exports.organizations = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.varchar)('id', { length: 36 }).primaryKey(),
    name: (0, pg_core_1.text)('name'),
    email: (0, pg_core_1.text)('email').notNull(),
    avatarUrl: (0, pg_core_1.text)('avatar_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
}, (table) => ({
    emailIdx: (0, pg_core_1.uniqueIndex)('users_email_idx').on(table.email),
}));
exports.organizations = (0, pg_core_1.pgTable)('organizations', {
    id: (0, pg_core_1.varchar)('id', { length: 36 }).primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    ownerId: (0, pg_core_1.varchar)('owner_id', { length: 36 })
        .references(() => exports.users.id)
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.projects = (0, pg_core_1.pgTable)('projects', {
    id: (0, pg_core_1.varchar)('id', { length: 36 }).primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    ownerId: (0, pg_core_1.varchar)('owner_id', { length: 36 })
        .references(() => exports.users.id)
        .notNull(),
    organizationId: (0, pg_core_1.varchar)('organization_id', { length: 36 })
        .references(() => exports.organizations.id)
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=schema.js.map