CREATE TYPE "public"."access_type" AS ENUM('individual', 'org');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('module', 'field_guide', 'tool');--> statement-breakpoint
CREATE TYPE "public"."lead_source" AS ENUM('free_guide');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('active', 'removed');--> statement-breakpoint
CREATE TYPE "public"."org_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'succeeded', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."visibility" AS ENUM('individual', 'org', 'both', 'neither');--> statement-breakpoint
CREATE TABLE "content" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "content_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text,
	"asset_ref" text,
	"visibility" "visibility" DEFAULT 'neither' NOT NULL,
	"downloadable" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"topic_tag" varchar(100),
	"situation_tag" varchar(100),
	"audience_tag" varchar(100),
	"related_module_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"access_type" "access_type" NOT NULL,
	"content_package" varchar(100) DEFAULT 'standard_v1' NOT NULL,
	"granted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"source" "lead_source" DEFAULT 'free_guide' NOT NULL,
	"tag" varchar(100) DEFAULT 'Free Guide Lead' NOT NULL,
	"delivered" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "org_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"code" varchar(32) NOT NULL,
	"max_uses" integer NOT NULL,
	"uses_count" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "org_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "org_memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"organization_id" integer NOT NULL,
	"status" "membership_status" DEFAULT 'active' NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo_url" text,
	"contact_name" varchar(255),
	"contact_email" varchar(255),
	"status" "org_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"stripe_payment_id" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_stripe_payment_id_unique" UNIQUE("stripe_payment_id")
);
--> statement-breakpoint
ALTER TABLE "org_codes" ADD CONSTRAINT "org_codes_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_memberships" ADD CONSTRAINT "org_memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;