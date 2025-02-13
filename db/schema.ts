import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Users Table
export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey(), // Aligning with NextAuth's string-based IDs
  name: text('name'),
  email: text('email').unique(),
  emailVerified: text('emailVerified'),
  image: text('image'),
});

// Accounts Table (OAuth Providers)
export const accountsTable = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => usersTable.id),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
  oauthTokenSecret: text('oauth_token_secret'),
  oauthToken: text('oauth_token'),
});

// Sessions Table
export const sessionsTable = sqliteTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull().references(() => usersTable.id),
  expires: text('expires').notNull(),
});

// Verification Tokens Table
export const verificationTokensTable = sqliteTable('verification_tokens', {
  identifier: text('identifier').primaryKey(),
  token: text('token').notNull(),
  expires: text('expires').notNull(),
});

// Habits Table
export const habitsTable = sqliteTable('habits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  fromTime: text('from_time').notNull(),
  toTime: text('to_time').notNull(),
  createdBy: text('created_by').notNull(),
  createdAt: text('created_at').notNull(),
  modifiedBy: text('modified_by'),
  modifiedAt: text('modified_at'),
  deletedAt: text('deleted_at'),
  deletedBy: text('deleted_by'),
});

// Token Table
export const tokenTable = sqliteTable('token', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  token: text('token').notNull(),
  expirationDateUTC: text('expiration_date_utc').notNull(),
  username: text('username').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

// Transactions Table
export const transactionsTable = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  habitsId: integer('habits_id')
    .notNull()
    .references(() => habitsTable.id, { onDelete: 'cascade' }),
  doneAt: text('done_at'),
  undoAt: text('undo_at'),
  createdAt: text('created_at').notNull(),
  assignTo: text('assign_to').notNull(),
  deletedAt: text('deleted_at'),
  activeDate: text('active_date'),
  deletedBy: text('deleted_by'),
});
