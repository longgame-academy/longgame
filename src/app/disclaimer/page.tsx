import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
        <h1 className="font-heading text-4xl font-bold mb-2">Disclaimer</h1>
        <p className="text-charcoal/50 text-sm mb-10">
          Effective Date: [Effective date pending &ndash; Shawn to confirm] | Long Game (LongGameAcademy.com)
        </p>
        <div className="font-body text-charcoal/80 leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">1. Educational Purposes Only</h2>
            <p>All content provided by Long Game, including the Parent Academy, digital downloads, free resources, website content, and the book &ldquo;Raising An Athlete: Built For The Long Game,&rdquo; is provided for general educational and informational purposes only. It is based on the personal experience and perspective of founder Shawn Dixon and is not a substitute for professional advice tailored to your specific circumstances.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">2. No Medical Advice</h2>
            <p>Nothing in our content constitutes medical advice. Our Services do not address the physical health, injury prevention, or medical treatment of athletes. Always consult a qualified physician or other healthcare provider regarding any medical questions or concerns.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">3. No Mental Health Advice</h2>
            <p>Our content addresses the parent-athlete relationship and the parenting experience within youth sports. It is not a substitute for professional mental health care. If you or your athlete are experiencing emotional distress, anxiety, or any mental health concern, please consult a qualified mental health professional.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">4. No Legal Advice</h2>
            <p>Nothing on our website or within our Services constitutes legal advice. If you require legal advice, including in connection with an organization license, you should consult a qualified lawyer.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">5. No Guaranteed Results</h2>
            <p>Long Game does not guarantee any specific outcome, result, or improvement from the use of our content, including outcomes related to an athlete&apos;s performance, recruitment, scholarship opportunities, or the parent-child relationship. Any examples, testimonials, or stories shared reflect individual experiences and are not a promise or guarantee of similar results.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">6. Parent Responsibility</h2>
            <p>You are solely responsible for how you apply the concepts, tools, and frameworks provided through our Services within your own family. Long Game is not responsible for decisions you make or actions you take based on our content.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">7. Organization Responsibility</h2>
            <p>Organizations that license Long Game content are responsible for the appropriate use, distribution, and implementation of that content within their organization, including ensuring the content is used in a manner consistent with their own policies and applicable law.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">8. External Links</h2>
            <p>Our website and content may contain links to third-party websites or resources. These links are provided for convenience only. Long Game does not endorse and is not responsible for the content, accuracy, or practices of any third-party website.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-3">9. Contact Information</h2>
            <p>If you have questions about this Disclaimer, you may contact us at:</p>
            <p className="mt-3">Long Game<br />Email: hello@longgameacademy.com</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
