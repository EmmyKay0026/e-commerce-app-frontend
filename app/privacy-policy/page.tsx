import React from "react";
import Hero from "@/components/organisms/SharedHeroSection";

export default function PrivacyPolicy() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="Privacy Policy"
        subtitle="Learn how IndustrialMart Nigeria collects, uses, and protects your personal information."
        backgroundImage="/hero-sections-img.webp"
      />

      {/* Main Content */}
      <PrivacyContent />
    </main>
  );
}

/* ---------------- MAIN CONTENT ---------------- */
function PrivacyContent() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
        <p className="text-base text-gray-500">
          <strong>Effective Date:</strong> November 12, 2025
        </p>

        <Section
          title="Privacy Policy"
          content={`IndustrialMart Nigeria (“we,” “us,” or “our”) operates www.industrialmart.ng, a digital marketplace for buying and selling industrial products, tools, and equipment across Nigeria.

This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website, mobile services, or any related tools provided by IndustrialMart Nigeria.

By using our platform, you agree to this Privacy Policy.`}
        />

        <Section
          title="1. Information We Collect"
          content={`We collect the following types of data to provide and improve our services:

A. Information You Provide Directly
- Account information: name, email, phone number, company name, and password.
- Vendor details: CAC registration, business address, and proof of identity for verification.
- Listings and content: product descriptions, photos, prices, and location.
- Communications: messages sent between buyers and sellers, feedback, or support requests.

B. Information Collected Automatically
- Device and log data: IP address, browser type, device information, and access times.
- Usage data: pages visited, listings viewed, search queries, and ad interactions.
- Cookies and tracking tools: see our Cookies Policy below for details.

C. Third-Party Data
We may receive limited information from partners or verification providers (e.g., for fraud prevention or CAC verification).`}
        />

        <Section
          title="2. How We Use Your Information"
          content={`We use your information to:
- Operate and maintain the IndustrialMart marketplace.
- Enable account creation, authentication, and listing management.
- Facilitate communication between buyers and sellers.
- Verify vendor identities and prevent fraudulent activity.
- Send updates, promotional messages, or service alerts (you may opt out).
- Improve website functionality, user experience, and security.

We do not sell or rent personal information to third parties.`}
        />

        <Section
          title="3. How We Share Information"
          content={`We only share data in limited situations:

- With buyers or sellers: to complete transactions and facilitate communication.
- With service providers: who support our operations (e.g., hosting, payment, analytics).
- With regulators or law enforcement: when legally required or for fraud prevention.
- With your consent: if you agree to specific disclosures (e.g., featured vendor promotions).

All partners must handle your data safely and comply with applicable data protection laws.`}
        />

        <Section
          title="4. Data Retention"
          content={`We keep your data only as long as necessary for:
- Maintaining your account and listings.
- Resolving disputes or complying with legal obligations.

You may request deletion of your account and data anytime via support@industrialmart.ng.`}
        />

        <Section
          title="5. Your Rights"
          content={`Under the Nigerian Data Protection Act (NDPA) and GDPR principles, you have the right to:
- Access your personal data.
- Correct or update inaccurate information.
- Request deletion of your data (“Right to be Forgotten”).
- Withdraw consent for marketing messages.

We respond to verified requests within 30 days.`}
        />

        <Section
          title="6. Data Security"
          content={`We use technical and organizational measures (SSL encryption, secure servers, limited access) to protect your data.
However, no online platform is 100% secure, and users should take care when sharing personal details with others on the marketplace.`}
        />

        <Section
          title="7. Third-Party Links"
          content={`IndustrialMart may contain links to third-party websites (e.g., vendors, service providers).
We are not responsible for their privacy practices — please review their own policies before engaging.`}
        />

        <Section
          title="8. Children’s Privacy"
          content={`Our platform is intended for business and adult users (18+).
We do not knowingly collect information from minors.`}
        />

        <Section
          title="9. Policy Updates"
          content={`We may update this Privacy Policy occasionally. Updates will appear on this page with a new “Effective Date.”
We encourage you to review it regularly.`}
        />

        <Section
          title="10. Contact Us"
          content={`For any privacy-related questions, requests, or complaints, contact us:

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
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  );
}
