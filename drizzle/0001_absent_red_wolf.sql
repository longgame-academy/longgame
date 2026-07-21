CREATE INDEX "content_type_idx" ON "content" USING btree ("type");--> statement-breakpoint
CREATE INDEX "content_visibility_idx" ON "content" USING btree ("visibility");--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_user_id_idx" ON "enrollments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "org_codes_org_id_idx" ON "org_codes" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "org_memberships_user_id_idx" ON "org_memberships" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "org_memberships_org_id_idx" ON "org_memberships" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "payments_user_id_idx" ON "payments" USING btree ("user_id");