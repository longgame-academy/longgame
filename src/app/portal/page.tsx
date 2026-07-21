import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function PortalDashboard() {
  const user = await currentUser();

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-2">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
      </h1>
      <p className="font-body text-text-body mb-10">
        Continue where you left off, or explore your resources below.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/portal/modules"
          className="bg-cream/60 border border-border-grey rounded-2xl p-6 hover:border-gold transition-colors shadow-[0_4px_16px_rgba(18,21,20,0.08)] hover:shadow-[0_8px_24px_rgba(18,21,20,0.12)]"
        >
          <h3 className="font-heading text-lg font-semibold mb-2">
            Parent Development System
          </h3>
          <p className="font-body text-sm text-text-body">
            Continue your 12-module journey.
          </p>
        </Link>

        <Link
          href="/portal/field-guides"
          className="bg-cream/60 border border-border-grey rounded-2xl p-6 hover:border-gold transition-colors shadow-[0_4px_16px_rgba(18,21,20,0.08)] hover:shadow-[0_8px_24px_rgba(18,21,20,0.12)]"
        >
          <h3 className="font-heading text-lg font-semibold mb-2">
            Field Guides
          </h3>
          <p className="font-body text-sm text-text-body">
            Quick reference for key moments.
          </p>
        </Link>

        <Link
          href="/portal/tools"
          className="bg-cream/60 border border-border-grey rounded-2xl p-6 hover:border-gold transition-colors shadow-[0_4px_16px_rgba(18,21,20,0.08)] hover:shadow-[0_8px_24px_rgba(18,21,20,0.12)]"
        >
          <h3 className="font-heading text-lg font-semibold mb-2">
            Practical Tools
          </h3>
          <p className="font-body text-sm text-text-body">
            Worksheets and conversation guides.
          </p>
        </Link>
      </div>
    </div>
  );
}


