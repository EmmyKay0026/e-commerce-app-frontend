import React from "react";
import Hero from "@/components/organisms/SharedHeroSection";

export default function PrivacyPolicy() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="Privacy Policy"
        subtitle="Learn how IndustrialMart Nigeria Nig Ltd collects, uses, and protects your personal information."
        backgroundImage="/hero-sections-img.png"
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
          <strong>Effective Date:</strong> November 4th, 2025
        </p>

        {/* 1. Information We Collect */}
        <Section
          title="1. Information We Collect"
          content={`1.1 Personal Information
- Name
- Email address
- Phone number
- WhatsApp number
- Business name and details (for vendors)
- Shipping and billing addresses

1.2 Account Information
- Username and password
- Vendor profile details (business slug, cover photo)
- Product listings and descriptions

1.3 Usage Information
- Pages you visit on our website
- Products you view or search for
- Device information (browser type, IP address)
- Cookies and similar tracking technologies`}
        />

        {/* 2. How We Use Your Information */}
        <Section
          title="2. How We Use Your Information"
          content={`We use your information to:
2.1 Create and manage your account
2.2 Process orders and transactions
2.3 Connect buyers with vendors
2.4 Send order updates, notifications, and account alerts
2.5 Improve our platform and user experience
2.6 Respond to your questions and support requests
2.7 Prevent fraud and ensure platform security
2.8 Send marketing emails (only if you opt in)`}
        />

        {/* 3. How We Share Your Information */}
        <Section
          title="3. How We Share Your Information"
          content={`We do not sell your personal information to third parties. However, we may share it in the following situations:

3.1 With Other Users
- Vendors can see buyer contact information when an inquiry or order is placed.
- Buyers can see vendor business information and contact details on product listings.

3.2 With Service Providers
- Payment processors to handle transactions.
- Email and SMS providers to send notifications.
- Hosting and cloud storage providers to store data.

3.3 For Legal Reasons
- When required by law or government authorities.
- To protect our rights, property, or safety.
- To prevent fraud or illegal activities.`}
        />

        {/* 4. How We Store and Protect Your Information */}
        <Section
          title="4. How We Store and Protect Your Information"
          content={`We store your information on secure servers and use industry-standard security measures to protect it, including:
4.1 Encryption of sensitive data
4.2 Secure password storage
4.3 Regular security updates and monitoring
4.4 Limited access to personal information by authorized personnel only

However, no method of transmission over the internet is 100% secure. While we take reasonable steps to protect your data, we cannot guarantee absolute security.`}
        />

        {/* 5. Your Rights and Choices */}
        <Section
          title="5. Your Rights and Choices"
          content={`You have the right to:
5.1 Access the personal information we hold about you
5.2 Update or correct your account details at any time
5.3 Delete your account and personal information (some data may be retained for legal or operational purposes)
5.4 Opt out of marketing emails by clicking the unsubscribe link
5.5 Control cookie preferences through your browser settings

To exercise any of these rights, contact us at [privacy email address].`}
        />

        {/* 6. Cookies */}
        <Section
          title="6. Cookies"
          content={`6.1 What Are Cookies?
Cookies are small files stored on your device that help us:
- Remember your login details
- Understand how you use our website
- Personalize content and recommendations

6.2 Managing Cookies
You can disable cookies in your browser settings, but some features of our platform may not work properly.`}
        />

        {/* 7. Changes to This Privacy Policy */}
        <Section
          title="7. Changes to This Privacy Policy"
          content={`We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top of this page and notify you via email or a notice on our platform. Your continued use of IndustrialMart after any changes means you accept the updated policy.`}
        />

        {/* 8. Contact Us */}
        <Section
          title="8. Contact Us"
          content={`If you have questions about this Privacy Policy or how we handle your information, contact us at:
Email: privacy@industrialmartnigeria.com
Phone: +234-7078581059
Address: #4 Amadi-ama, Trans Amadi Industrial Layout, Port Harcourt, Rivers State.`}
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
