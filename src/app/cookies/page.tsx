import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
        <h1 className="font-heading text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-charcoal/50 text-sm mb-10">
          Effective Date: [Effective date pending &ndash; Shawn to confirm] | Long Game (LongGameAcademy.com)
        </p>
        <div className="font-body text-charcoal/80 leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">1. What Cookies Are</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites function properly, improve user experience, and provide information to website owners.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">2. How We Use Cookies</h2>
            <p>We use cookies to operate our website, remember your preferences, understand how visitors use our Services, and support our marketing efforts.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">3. Types of Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> required for the website and Parent Portal to function properly, such as maintaining your login session.</li>
              <li><strong>Performance and Analytics Cookies:</strong> help us understand how visitors interact with our website so we can improve it.</li>
              <li><strong>Functionality Cookies:</strong> remember your preferences to provide a more personalized experience.</li>
              <li><strong>Marketing Cookies:</strong> used to deliver relevant content and measure the effectiveness of our email and advertising campaigns.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">4. Third-Party Cookies</h2>
            <p>Some cookies are placed by third-party services we use, such as analytics providers, email marketing platforms, and payment processors. These third parties may use cookies in accordance with their own privacy and cookie policies.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">5. Managing Cookies</h2>
            <p>Most web browsers allow you to control cookies through their settings. You can typically set your browser to refuse cookies or alert you when cookies are being sent. Please note that disabling certain cookies may affect the functionality of our website and Services.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">6. Updates</h2>
            <p>We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with a revised effective date.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">7. Contact Information</h2>
            <p>If you have questions about this Cookie Policy, you may contact us at:</p>
            <p className="mt-3">Long Game<br />Email: hello@longgameacademy.com</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

