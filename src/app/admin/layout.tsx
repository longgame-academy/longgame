import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminMotionMain } from "@/components/AdminMotionMain";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const check = await requireAdmin();

  if (!check.ok) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-blue-grey text-charcoal">
      <header className="bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-heading font-bold tracking-wide">
            LONG GAME ADMIN
          </Link>
          <nav className="flex gap-6 font-heading text-sm">
            <Link href="/admin/organizations" className="hover:text-gold transition-colors">
              Organizations
            </Link>
            <Link href="/admin/users" className="hover:text-gold transition-colors">
              Users
            </Link>
            <Link href="/admin/content" className="hover:text-gold transition-colors">
              Content
            </Link>
            <Link href="/admin/leads" className="hover:text-gold transition-colors">
              Leads
            </Link>
            <Link href="/" className="hover:text-gold transition-colors">
              Back to Site
            </Link>
          </nav>
        </div>
      </header>
      <AdminMotionMain>{children}</AdminMotionMain>
    </div>
  );
}
