import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  funnel: text('funnel').notNull(),
  step: text('step').notNull(),
  name: text('name'),
  email: text('email').notNull(),
  phone: text('phone'),
  answers: jsonb('answers').$type<Record<string, string>>().notNull().default({}),
  tracking: jsonb('tracking').$type<Record<string, string>>().notNull().default({}),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
