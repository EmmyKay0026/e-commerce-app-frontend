import React from "react";
import Hero from "@/components/organisms/SharedHeroSection";

export default function TermsAndConditions() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="Terms and Conditions"
        subtitle="Please read these terms carefully before using IndustrialMart Nigeria or any of our services."
        backgroundImage="/hero-sections-img.png"
      />

      {/* Main Content */}
      <TermsContent />
    </main>
  );
}

/* ---------------- MAIN CONTENT ---------------- */
function TermsContent() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
        <p className="text-base text-gray-500">
          <strong>Last Updated:</strong> November 12, 2025
        </p>

        <Section
          title="Welcome to IndustrialMart Nigeria"
          content={`Welcome to IndustrialMart Nigeria (“IndustrialMart,” “we,” “our,” or “us”).

These Terms and Conditions (“Terms”) govern your access to and use of our website [www.industrialmart.ng] and all associated services, including listings, advertising, and communications between buyers and sellers.

By accessing or using our platform, you agree to comply with these Terms. If you do not agree, please do not use our services.`}
        />

        <Section
          title="1. About IndustrialMart Nigeria"
          content={`IndustrialMart Nigeria is an online marketplace designed for the industrial sector — including oil and gas, construction, engineering, and manufacturing industries.

We provide a platform where individuals and businesses can buy, sell, or advertise industrial products and equipment.

IndustrialMart Nigeria:
- Does not sell or manufacture products directly.
- Does not handle payments between buyers and sellers.
- Does not deliver or ship products.
- Does not provide any warranty or guarantee for products listed on the site.

We only facilitate communication between users.`}
        />

        <Section
          title="2. Acceptance of Terms"
          content={`By registering, browsing, or transacting on IndustrialMart Nigeria, you agree that:
- You are at least 18 years old or a legally registered business entity.
- You will comply with all applicable Nigerian laws and regulations.
- You have read and accepted our Privacy Policy, Cookies Policy, Refund & Return Policy, Buyer Policy, and Seller Policy.

These documents collectively form part of this User Agreement.`}
        />

        <Section
          title="3. Account Registration"
          content={`To post or sell products, users must create an account using accurate and verifiable details.

You agree to:
- Provide truthful business or personal information.
- Keep your login credentials secure.
- Take full responsibility for all activities under your account.

We reserve the right to suspend or delete accounts that use false identities, impersonate others, or violate our policies.`}
        />

        <Section
          title="4. Use of the Platform"
          content={`You may use IndustrialMart Nigeria only for lawful purposes related to buying, selling, or advertising industrial products.

You agree not to:
- Post false, misleading, or inappropriate content.
- List prohibited, illegal, or counterfeit items.
- Spam or harass other users.
- Engage in fraudulent transactions or scams.
- Copy, scrape, or reproduce our content without permission.

Violation of these terms may result in account suspension or permanent ban without prior notice.`}
        />

        <Section
          title="5. Marketplace Transactions"
          content={`All transactions occur directly between buyers and sellers.

IndustrialMart Nigeria does not:
- Participate in pricing, negotiation, or delivery.
- Collect or transfer money between users.
- Guarantee the quality, safety, legality, or authenticity of listed products.

Users are responsible for verifying all transaction details before payment or delivery.`}
        />

        <Section
          title="6. Product Listings"
          content={`Sellers must ensure that all listings are:
- Accurate, complete, and not misleading.
- Clearly labeled as New, Fairly Used, or Refurbished.
- Supported with real, unedited photos.
- Compliant with all applicable standards and regulations.

Misrepresentation Warning:
Any seller who lists a used product as new or provides false information may have their account terminated without notice.`}
        />

        <Section
          title="7. Payments"
          content={`IndustrialMart Nigeria does not collect or process any payments on the platform.

Buyers and sellers are responsible for agreeing on safe, verifiable payment methods such as cash on delivery or traceable bank transfers.

We strongly discourage advance or pre-payments unless the seller is verified and trusted.`}
        />

        <Section
          title="8. Refunds, Returns, and Disputes"
          content={`Refunds and returns are handled directly between buyers and sellers.

IndustrialMart Nigeria:
- Does not issue refunds or replacements.
- May assist in communication between users in case of disputes.
- Will not be held liable for losses, product failures, or non-delivery.

For safety, always confirm return terms before making payment.`}
        />

        <Section
          title="9. Fairly Used and Refurbished Goods"
          content={`Sellers may list fairly used or refurbished items, but they must:
- Clearly state the condition in the listing title and description.
- Disclose any defects or wear.

Failure to do so is considered fraudulent misrepresentation and may result in immediate account termination.`}
        />

        <Section
          title="10. Prohibited Items"
          content={`You may not list, promote, or sell:
- Counterfeit or stolen goods
- Hazardous or unregulated chemicals
- Expired, defective, or unsafe industrial materials
- Pornographic, political, or offensive content
- Items that violate Nigerian import/export or safety laws

IndustrialMart Nigeria reserves the right to remove any listing at its discretion.`}
        />

        <Section
          title="11. Intellectual Property"
          content={`All logos, trademarks, and content on IndustrialMart Nigeria are the property of IndustrialMart Nigeria or their respective owners.

You may not reproduce, distribute, or modify any site content without written permission.`}
        />

        <Section
          title="12. Limitation of Liability"
          content={`To the fullest extent permitted by law, IndustrialMart Nigeria is not liable for:
- Financial loss, fraud, or non-delivery arising from user transactions.
- Product defects, safety issues, or performance failures.
- Damages resulting from user negligence or third-party actions.

All users transact at their own discretion and risk.`}
        />

        <Section
          title="13. Account Suspension or Termination"
          content={`We reserve the right to suspend or permanently terminate any account that:
- Violates these Terms or our policies.
- Engages in fraud, misrepresentation, or harassment.
- Receives repeated verified complaints.
- Misuses the platform for non-industrial purposes.

Termination may occur without prior notice or compensation.`}
        />

        <Section
          title="14. Privacy and Data Use"
          content={`We respect your privacy and handle your data according to our Privacy Policy and Cookies Policy.

By using our site, you consent to the collection and use of your data as described in those policies.`}
        />

        <Section
          title="15. Changes to These Terms"
          content={`We may update or modify these Terms from time to time to reflect new laws or business practices.

All updates will be posted on this page with a new “Last Updated” date.

Continued use of our platform after any change means you accept the updated Terms.`}
        />

        <Section
          title="16. Governing Law and Jurisdiction"
          content={`These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria.

Any disputes shall be subject to the exclusive jurisdiction of Nigerian courts.`}
        />

        <Section
          title="17. Contact Information"
          content={`For inquiries, complaints, or support:

IndustrialMart Nigeria
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
