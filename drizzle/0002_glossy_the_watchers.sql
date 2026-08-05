CREATE TYPE "public"."entitlement_kind" AS ENUM('parent_academy', 'library');--> statement-breakpoint
CREATE TYPE "public"."entitlement_source" AS ENUM('purchase', 'org', 'admin');--> statement-breakpoint
ALTER TYPE "public"."payment_status" ADD VALUE 'partially_refunded';--> statement-breakpoint
CREATE TABLE "abandoned_checkouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"amount" integer,
	"currency" varchar(3),
	"stripe_payment_intent_id" varchar(255),
	"recovered_at" timestamp,
	"last_emailed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entitlements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"kind" "entitlement_kind" NOT NULL,
	"source" "entitlement_source" DEFAULT 'purchase' NOT NULL,
	"order_id" integer,
	"starts_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "renewal_reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"entitlement_id" integer NOT NULL,
	"offset_days" integer NOT NULL,
	"scheduled_for" timestamp NOT NULL,
	"sent_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "order_number" varchar(32);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "currency" varchar(3);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "first_name" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "last_name" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "stripe_customer_id" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "stripe_payment_intent_id" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "stripe_checkout_session_id" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "amount_refunded" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "tax_amount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_order_id_payments_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "renewal_reminders" ADD CONSTRAINT "renewal_reminders_entitlement_id_entitlements_id_fk" FOREIGN KEY ("entitlement_id") REFERENCES "public"."entitlements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "abandoned_checkouts_email_idx" ON "abandoned_checkouts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "abandoned_checkouts_recovered_idx" ON "abandoned_checkouts" USING btree ("recovered_at");--> statement-breakpoint
CREATE UNIQUE INDEX "entitlements_user_kind_idx" ON "entitlements" USING btree ("user_id","kind");--> statement-breakpoint
CREATE INDEX "entitlements_expires_at_idx" ON "entitlements" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "renewal_reminders_entitlement_offset_idx" ON "renewal_reminders" USING btree ("entitlement_id","offset_days");--> statement-breakpoint
CREATE INDEX "renewal_reminders_due_idx" ON "renewal_reminders" USING btree ("scheduled_for","sent_at");--> statement-breakpoint
CREATE INDEX "payments_email_idx" ON "payments" USING btree ("email");--> statement-breakpoint
CREATE INDEX "payments_payment_intent_idx" ON "payments" USING btree ("stripe_payment_intent_id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_number_unique" UNIQUE("order_number");