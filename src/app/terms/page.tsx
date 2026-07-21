import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
        <h1 className="font-heading text-4xl font-bold mb-2">Terms of Use</h1>
        <p className="text-charcoal/50 text-sm mb-10">
          Effective Date: [Effective date pending &ndash; Shawn to confirm] | Long Game (LongGameAcademy.com)
        </p>
        <div className="font-body text-charcoal/80 leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of LongGameAcademy.com and all associated products and Services, including the Parent Academy, organization licenses, digital downloads, the Parent Portal, and related content (collectively, the &ldquo;Services&rdquo;), operated by Long Game (&ldquo;Long Game,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).</p>
            <p className="mt-3">By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you should not access or use the Services.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">2. Website Use</h2>
            <p>You agree to use our website and Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Use the Services in any way that violates applicable law or regulation.</li>
              <li>Attempt to gain unauthorized access to any portion of the Services, other accounts, or related systems or networks.</li>
              <li>Interfere with or disrupt the operation of the Services or servers or networks connected to the Services.</li>
              <li>Use any automated means to access or scrape the Services without our prior written consent.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">3. Intellectual Property</h2>
            <p>All content on LongGameAcademy.com and within our Services, including but not limited to text, graphics, logos, course materials, frameworks, tools, videos, and the book &ldquo;Raising An Athlete: Built For The Long Game,&rdquo; is the property of Long Game or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
            <p className="mt-3">You may not reproduce, distribute, modify, publicly display, or create derivative works from any content without our prior written permission, except as expressly permitted for your personal, non-commercial use in connection with your own access to the Services.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">4. Parent Academy Access</h2>
            <p>Purchase of the Parent Academy grants you a personal, non-transferable, non-exclusive license to access the course content for your own personal use. You may not share your login credentials, resell access, or distribute course materials to third parties.</p>
            <p className="mt-3">We reserve the right to suspend or terminate access for any user who violates these Terms, including unauthorized sharing of account access or course content.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">5. Organization Licenses</h2>
            <p>Organizations (such as sports clubs, teams, and leagues) that license Long Game content for use with their members do so under the terms of a separate organization license agreement. Where such an agreement exists, its terms govern the organization&apos;s use of the Services, and these Terms apply to individual users to the extent not otherwise addressed.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">6. Digital Products</h2>
            <p>Digital products, including downloadable guides and resources, are licensed, not sold, for your personal use. Due to the nature of digital products, all sales are final except as set out in Section 8 (Refund Policy) or as required by applicable law.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">7. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate and complete information when creating an account or making a purchase, and to keep such information up to date.</p>
            <p className="mt-3">You acknowledge that Long Game&apos;s content is educational in nature and that you are responsible for how you apply it within your own family or organization.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">8. Refund Policy</h2>
            <p>If you are not satisfied with your Parent Academy purchase, contact us within 30 days of purchase at hello@longgameacademy.com for a full refund. Refunds are issued to the original payment method. Organization licenses are governed by their separate license agreement.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, Long Game, its founder, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of or related to your use of, or inability to use, the Services.</p>
            <p className="mt-3">Our total liability to you for any claim arising out of or relating to these Terms or the Services shall not exceed the amount you paid to Long Game in the twelve (12) months preceding the event giving rise to the claim.</p>
            <p className="mt-3">Nothing in these Terms limits or excludes any liability that cannot be limited or excluded under applicable law.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">10. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles. You agree that any dispute arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts located in Ontario, Canada.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">11. Contact Information</h2>
            <p>If you have questions about these Terms, you may contact us at:</p>
            <p className="mt-3">Long Game<br />5 Latzer Cres, Brantford, ON N3V 1C9<br />Email: hello@longgameacademy.com</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

