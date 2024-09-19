import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const user = pgTable('users', {
    id: uuid('id').primaryKey(),
    fname: varchar('fname', { length: 100 }).notNull(),
    lname: varchar('lname', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    createdAt: timestamp('createAt').default(sql`CURRENT_TIMESTAMP`)
})

export const comment = pgTable('comments', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});