import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
  }),
);

export const organizations = pgTable('organizations', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  name: text('name').notNull(),
  ownerId: varchar('owner_id', { length: 36 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: varchar('owner_id', { length: 36 })
    .references(() => users.id)
    .notNull(),
  organizationId: varchar('organization_id', { length: 36 })
    .references(() => organizations.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});