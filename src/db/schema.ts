import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
  serial,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------- Enums ----------
export const orgStatusEnum = pgEnum("org_status", ["pending", "verified", "rejected"]);
export const membershipStatusEnum = pgEnum("membership_status", ["active", "removed"]);
export const accessTypeEnum = pgEnum("access_type", ["individual", "org"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "succeeded", "failed", "refunded", "partially_refunded"]);
// The Parent Academy is the purchased product; Library access is the 12-month
// bonus that comes with it. They are deliberately separate rows so a future
// offer can change one without touching the other.
export const entitlementKindEnum = pgEnum("entitlement_kind", ["parent_academy", "library"]);
export const entitlementSourceEnum = pgEnum("entitlement_source", ["purchase", "org", "admin"]);
export const leadSourceEnum = pgEnum("lead_source", ["free_guide"]);
export const contentTypeEnum = pgEnum("content_type", ["module", "field_guide", "tool"]);
export const visibilityEnum = pgEnum("visibility", ["individual", "org", "both", "neither"]);

// ---------- Organizations ----------
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: text("logo_url"),
  contactName: varchar("contact_name", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  status: orgStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orgCodes = pgTable("org_codes", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  code: varchar("code", { length: 32 }).notNull().unique(),
  maxUses: integer("max_uses").notNull(),
  usesCount: integer("uses_count").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("org_codes_org_id_idx").on(table.organizationId),
]);

export const orgMemberships = pgTable("org_memberships", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(), // Clerk id
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  status: membershipStatusEnum("status").notNull().default("active"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
}, (table) => [
  index("org_memberships_user_id_idx").on(table.userId),
  index("org_memberships_org_id_idx").on(table.organizationId),
]);

// ---------- Enrollments / Payments ----------
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  accessType: accessTypeEnum("access_type").notNull(),
  contentPackage: varchar("content_package", { length: 100 }).notNull().default("standard_v1"),
  grantedAt: timestamp("granted_at").notNull().defaultNow(),
}, (table) => [
  uniqueIndex("enrollments_user_id_idx").on(table.userId),
]);

/**
 * The order ledger. `stripePaymentId` stays the idempotency key it has always
 * been — its unique constraint is what stops a retried webhook creating a
 * second order — and now holds the PaymentIntent id for on-site checkout.
 *
 * Everything added below is nullable or defaulted so the migration is purely
 * additive and existing rows stay valid.
 */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  stripePaymentId: varchar("stripe_payment_id", { length: 255 }).notNull().unique(),
  amount: integer("amount").notNull(), // cents
  status: paymentStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),

  // Human-facing Long Game order id, e.g. "LG-7Q2K4M8P". Support and the
  // future verified-reviews flow look orders up by this.
  orderNumber: varchar("order_number", { length: 32 }).unique(),
  currency: varchar("currency", { length: 3 }),
  email: varchar("email", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  stripeCheckoutSessionId: varchar("stripe_checkout_session_id", { length: 255 }),
  // Cents refunded so far, so a partial refund is distinguishable from a full
  // one without another round trip to Stripe.
  amountRefunded: integer("amount_refunded").notNull().default(0),
  taxAmount: integer("tax_amount").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  index("payments_user_id_idx").on(table.userId),
  index("payments_email_idx").on(table.email),
  index("payments_payment_intent_idx").on(table.stripePaymentIntentId),
]);

/**
 * What a user is actually entitled to, and until when. One row per
 * (user, kind); `expiresAt` null means it does not expire.
 *
 * Parent Academy access remains gated by `enrollments`, which every existing
 * access check already reads. This table adds the time-bounded Library bonus
 * alongside it without changing how the Academy is granted.
 */
export const entitlements = pgTable("entitlements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  kind: entitlementKindEnum("kind").notNull(),
  source: entitlementSourceEnum("source").notNull().default("purchase"),
  // Which order paid for this. Null for org and admin grants.
  orderId: integer("order_id").references(() => payments.id),
  startsAt: timestamp("starts_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  // Makes granting idempotent: a retried webhook conflicts instead of
  // inserting a second entitlement.
  uniqueIndex("entitlements_user_kind_idx").on(table.userId, table.kind),
  index("entitlements_expires_at_idx").on(table.expiresAt),
]);

/**
 * Email captured on the checkout page before payment completed. Never implies
 * a paid order or any entitlement. `recoveredAt` is stamped once the same
 * email buys, which is what suppresses them from the recovery sequence.
 */
export const abandonedCheckouts = pgTable("abandoned_checkouts", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  // Optional on purpose: recovery must not require a name.
  firstName: varchar("first_name", { length: 255 }),
  amount: integer("amount"),
  currency: varchar("currency", { length: 3 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  recoveredAt: timestamp("recovered_at"),
  lastEmailedAt: timestamp("last_emailed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  uniqueIndex("abandoned_checkouts_email_idx").on(table.email),
  index("abandoned_checkouts_recovered_idx").on(table.recoveredAt),
]);

/**
 * Voluntary renewal nudges at 30/14/7 days before Library expiry. Nothing here
 * charges anyone — there is no auto-renew. Rows are created when the Library
 * entitlement is granted so the schedule is data, not a cron guess.
 */
export const renewalReminders = pgTable("renewal_reminders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  entitlementId: integer("entitlement_id").notNull().references(() => entitlements.id),
  // 30, 14 or 7.
  offsetDays: integer("offset_days").notNull(),
  scheduledFor: timestamp("scheduled_for").notNull(),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  // One reminder per entitlement per offset, so re-running the scheduler or
  // replaying a webhook cannot double-book a send.
  uniqueIndex("renewal_reminders_entitlement_offset_idx").on(table.entitlementId, table.offsetDays),
  index("renewal_reminders_due_idx").on(table.scheduledFor, table.sentAt),
]);

// ---------- Leads ----------
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }),
  source: leadSourceEnum("source").notNull().default("free_guide"),
  tag: varchar("tag", { length: 100 }).notNull().default("Free Guide Lead"),
  delivered: boolean("delivered").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- Content ----------
export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  type: contentTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  assetRef: text("asset_ref"),
  visibility: visibilityEnum("visibility").notNull().default("neither"),
  downloadable: boolean("downloadable").notNull().default(false),
  order: integer("order").notNull().default(0),
  // Phase 2 tagging - nullable now, populate later
  topicTag: varchar("topic_tag", { length: 100 }),
  situationTag: varchar("situation_tag", { length: 100 }),
  audienceTag: varchar("audience_tag", { length: 100 }),
  relatedModuleId: integer("related_module_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("content_type_idx").on(table.type),
  index("content_visibility_idx").on(table.visibility),
]);

// ---------- Relations ----------
export const organizationsRelations = relations(organizations, ({ many }) => ({
  codes: many(orgCodes),
  memberships: many(orgMemberships),
}));

export const orgCodesRelations = relations(orgCodes, ({ one }) => ({
  organization: one(organizations, {
    fields: [orgCodes.organizationId],
    references: [organizations.id],
  }),
}));

export const orgMembershipsRelations = relations(orgMemberships, ({ one }) => ({
  organization: one(organizations, {
    fields: [orgMemberships.organizationId],
    references: [organizations.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ many }) => ({
  entitlements: many(entitlements),
}));

export const entitlementsRelations = relations(entitlements, ({ one, many }) => ({
  order: one(payments, {
    fields: [entitlements.orderId],
    references: [payments.id],
  }),
  reminders: many(renewalReminders),
}));

export const renewalRemindersRelations = relations(renewalReminders, ({ one }) => ({
  entitlement: one(entitlements, {
    fields: [renewalReminders.entitlementId],
    references: [entitlements.id],
  }),
}));
