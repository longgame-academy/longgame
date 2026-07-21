import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/organizations"
          className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 hover:border-gold transition-colors shadow-sm hover:shadow-md"
        >
          <h3 className="font-heading font-semibold mb-1">Organizations</h3>
          <p className="font-body text-sm text-charcoal/60">
            Manage orgs, codes, and approvals
          </p>
        </Link>
        <Link
          href="/admin/users"
          className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 hover:border-gold transition-colors shadow-sm hover:shadow-md"
        >
          <h3 className="font-heading font-semibold mb-1">Users</h3>
          <p className="font-body text-sm text-charcoal/60">
            Search users, grant or revoke access
          </p>
        </Link>
        <Link
          href="/admin/content"
          className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 hover:border-gold transition-colors shadow-sm hover:shadow-md"
        >
          <h3 className="font-heading font-semibold mb-1">Content</h3>
          <p className="font-body text-sm text-charcoal/60">
            Manage modules, field guides, and tools
          </p>
        </Link>
        <Link
          href="/admin/leads"
          className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 hover:border-gold transition-colors shadow-sm hover:shadow-md"
        >
          <h3 className="font-heading font-semibold mb-1">Leads</h3>
          <p className="font-body text-sm text-charcoal/60">
            View and export Free Guide leads
          </p>
        </Link>
      </div>
    </div>
  );
}
