"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRelations = exports.columnsRelations = exports.usersRelations = exports.tasks = exports.columns = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const cuid2_1 = require("@paralleldrive/cuid2");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id')
        .$defaultFn(() => (0, cuid2_1.createId)())
        .primaryKey(),
    name: (0, pg_core_1.text)('name'),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    password: (0, pg_core_1.text)('password').notNull(),
    avatarUrl: (0, pg_core_1.text)('avatar_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.columns = (0, pg_core_1.pgTable)('columns', {
    id: (0, pg_core_1.text)('id')
        .$defaultFn(() => (0, cuid2_1.createId)())
        .primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    order: (0, pg_core_1.integer)('order').notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    authorId: (0, pg_core_1.text)('author_id')
        .notNull()
        .references(() => exports.users.id, { onDelete: 'cascade' }),
});
exports.tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.text)('id')
        .$defaultFn(() => (0, cuid2_1.createId)())
        .primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    authorId: (0, pg_core_1.text)('author_id')
        .notNull()
        .references(() => exports.users.id, { onDelete: 'cascade' }),
    columnId: (0, pg_core_1.text)('column_id')
        .notNull()
        .references(() => exports.columns.id, { onDelete: 'cascade' }),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    tasks: many(exports.tasks),
    columns: many(exports.columns),
}));
exports.columnsRelations = (0, drizzle_orm_1.relations)(exports.columns, ({ many, one }) => ({
    tasks: many(exports.tasks),
    author: one(exports.users, {
        fields: [exports.columns.authorId],
        references: [exports.users.id],
    }),
}));
exports.tasksRelations = (0, drizzle_orm_1.relations)(exports.tasks, ({ one }) => ({
    author: one(exports.users, {
        fields: [exports.tasks.authorId],
        references: [exports.users.id],
    }),
    column: one(exports.columns, {
        fields: [exports.tasks.columnId],
        references: [exports.columns.id],
    }),
}));
//# sourceMappingURL=schema.js.map