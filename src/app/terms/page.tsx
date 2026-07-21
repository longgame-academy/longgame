import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-cream text-charcoal">
      <Nav />
      <section className="max-w-3xl mx-auto w-full px-6 py-20">
        <h1 className="font-heading text-4xl font-bold mb-10">
          Terms of Service
        </h1>
        <div className="font-body text-charcoal/80 leading-relaxed space-y-6">
          <p className="text-charcoal/50 text-sm">
            Last updated: [DATE — Shawn to confirm]
          </p>
          <p>
            [Placeholder — final terms pending legal review. Should cover:
            purchase terms, refund policy, access rights, prohibited use
            (content redistribution), organization code terms, account
            termination.]
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}