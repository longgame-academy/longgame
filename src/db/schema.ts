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
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "succeeded", "failed", "refunded"]);
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

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  stripePaymentId: varchar("stripe_payment_id", { length: 255 }).notNull().unique(),
  amount: integer("amount").notNull(), // cents
  status: paymentStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("payments_user_id_idx").on(table.userId),
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
  // Phase 2 tagging â€” nullable now, populate later
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
