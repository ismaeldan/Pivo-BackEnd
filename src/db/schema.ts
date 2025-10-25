import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const columns = pgTable('columns', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const tasks = pgTable('tasks', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),

  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  columnId: text('column_id')
    .notNull()
    .references(() => columns.id, { onDelete: 'cascade' }),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  columns: many(columns),
}));

export const columnsRelations = relations(columns, ({ many, one }) => ({ 
  tasks: many(tasks),
  author: one(users, {
    fields: [columns.authorId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  author: one(users, {
    fields: [tasks.authorId],
    references: [users.id],
  }),
  column: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
}));