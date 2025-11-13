import React from "react";
import Hero from "@/components/organisms/SharedHeroSection";

export default function CookiesPolicy() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="Cookies Policy"
        subtitle="Learn how IndustrialMart Nigeria uses cookies to enhance your browsing experience and improve our services."
        backgroundImage="/hero-sections-img.png"
      />

      {/* Main Content */}
      <CookiesContent />
    </main>
  );
}

/* ---------------- MAIN CONTENT ---------------- */
function CookiesContent() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
        <p className="text-base text-gray-500">
          <strong>Effective Date:</strong> November 12, 2025
        </p>

        <Section
          title="1. What Are Cookies?"
          content={`Cookies are small text files stored on your device when you visit a website. They help remember your preferences, login status, and browsing behavior.`}
        />

        <Section
          title="2. How We Use Cookies"
          content={`We use cookies to:
- Keep you logged in securely.
- Remember your search and filter preferences.
- Track ad performance and page visits (analytics).
- Show relevant listings and promotions.
- Protect against spam, fraud, and abuse.`}
        />

        <Section
          title="3. Types of Cookies We Use"
          content={`• **Essential Cookies:** Required for core site features such as login and navigation.
• **Functional Cookies:** Save preferences like language and location.
• **Analytics Cookies:** Help us understand user behavior and improve performance.
• **Advertising Cookies:** Used for targeted or promotional content (when enabled).`}
        />

        <Section
          title="4. Managing Cookies"
          content={`You can manage or delete cookies in your browser settings. However, disabling some cookies may affect website performance or limit access to certain features.`}
        />

        <Section
          title="5. Third-Party Cookies"
          content={`We may use third-party analytics tools such as Google Analytics or Meta Pixel to understand user behavior and improve marketing. These services have their own privacy and cookie policies.`}
        />

        <Section
          title="6. Consent"
          content={`By using our website, you consent to our use of cookies in line with this policy. You may change or withdraw consent at any time through your browser or account settings.`}
        />

        <Section
          title="7. Contact"
          content={`If you have questions about our Cookies Policy, please contact us:
📧 support@industrialmart.ng
🌐 www.industrialmart.ng`}
        />
      </div>
    </section>
  );
}

/* ---------------- Reusable Section Component ---------------- */
function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p
        className="text-gray-700 whitespace-pre-line leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
