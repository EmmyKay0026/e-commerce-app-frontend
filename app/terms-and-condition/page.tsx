import React from "react";
import Hero from "@/components/organisms/SharedHeroSection";

export default function TermsAndConditions() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="Terms and Conditions"
        subtitle="Welcome to IndustrialMart. Please read our terms carefully before using our platform or any of our services."
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
          <strong>Effective Date:</strong> November 4th, 2025
        </p>

        {/* 1. Definitions */}
        <Section
          title="1. Definitions"
          content={`"We", "Us", "Our" refers to IndustrialMart Nigeria Nig Ltd.
"User", "You", "Your" refers to anyone who accesses or uses our platform.
"Platform" refers to our website and related services.
"Vendor" refers to sellers who list and sell products on our platform.
"Buyer" refers to users who purchase or inquire about products on our platform.
"Content" refers to all text, images, logos, product listings, and other materials on our platform.`}
        />

        {/* 2. Acceptance of Terms */}
        <Section
          title="2. Acceptance of Terms"
          content={`By creating an account, browsing our platform, or making a purchase, you agree to these Terms and Conditions.
If you are using our platform on behalf of a business, you confirm that you have the authority to bind that business to these terms.`}
        />

        {/* 3. User Responsibilities */}
        <Section
          title="3. User Responsibilities"
          content={`3.1 Account Security
You are responsible for maintaining the confidentiality of your account credentials.
You must notify us immediately if you suspect unauthorized access to your account.

3.2 Prohibited Activities
You may not:
- Provide false or misleading information when registering or listing products.
- Engage in fraudulent transactions or misrepresent products.
- Use our platform for illegal activities or to sell prohibited items.
- Spam, harass, or threaten other users.
- Copy, reproduce, or scrape content from our platform without permission.
- Attempt to hack, disrupt, or compromise the security of our platform.

3.3 Accurate Information
You must provide accurate and up-to-date information, including contact details, product descriptions, and pricing.`}
        />

        {/* 4. Vendor Terms */}
        <Section
          title="4. Vendor Terms"
          content={`4.1 Listing Products
Vendors are responsible for the accuracy of their product listings, including descriptions, pricing, images, and availability.
All products must comply with Nigerian laws and regulations.

4.2 Product Approval
We reserve the right to review, approve, reject, or remove any product listing that violates our policies or does not meet our quality standards.

4.3 Transactions
Vendors are responsible for fulfilling orders, managing inventory, and providing customer support to buyers.
Payment terms and delivery timelines must be clearly stated in product listings.`}
        />

        {/* 5. Buyer Terms */}
        <Section
          title="5. Buyer Terms"
          content={`5.1 Product Inquiries and Orders
Buyers can request quotes and communicate directly with vendors through our platform.
All transactions, negotiations, and agreements are between the buyer and vendor.

5.2 Payment
Payment terms are determined by individual vendors. We are not responsible for processing payments unless otherwise stated.

5.3 Delivery
Delivery terms, timelines, and costs are set by vendors. We are not responsible for delays, damages, or delivery issues.`}
        />

        {/* 6. Payments and Pricing */}
        <Section
          title="6. Payments and Pricing"
          content={`6.1 All prices are listed in Nigerian Naira unless otherwise stated.
6.2 Vendors are responsible for setting their own prices and updating them as needed.
6.3 We are not responsible for pricing errors made by vendors.
6.4 Payment methods may include bank transfers, card payments, or other options as specified by vendors.`}
        />

        {/* 7. Refunds and Returns */}
        <Section
          title="7. Refunds and Returns"
          content={`7.1 Refund and return policies are determined by individual vendors and should be clearly stated in their product listings.
7.2 IndustrialMart is not responsible for processing refunds or handling returns unless explicitly stated.
7.3 Disputes regarding refunds or returns should be resolved directly between buyers and vendors.`}
        />

        {/* 8. Intellectual Property Rights */}
        <Section
          title="8. Intellectual Property Rights"
          content={`8.1 All content on our platform, including text, images, logos, design, and trademarks, is owned by IndustrialMart or our partners and is protected by copyright laws.
8.2 You may not copy, reproduce, distribute, or use our content for commercial purposes without written permission.
8.3 Vendors retain ownership of their product images and descriptions but grant us permission to display them on our platform.`}
        />

        {/* 9. Limitation of Liability */}
        <Section
          title="9. Limitation of Liability"
          content={`9.1 IndustrialMart acts as a marketplace connecting buyers and vendors. We do not manufacture, sell, or deliver products ourselves.
9.2 We are not responsible for:
- The quality, safety, or legality of products listed by vendors.
- The accuracy of product descriptions, pricing, or availability.
- Delays, damages, or losses during delivery.
- Disputes between buyers and vendors.
- Any indirect, incidental, or consequential damages resulting from your use of our platform.

9.3 We do not guarantee that our platform will be error-free, uninterrupted, or free from malicious code.
9.4 Your use of our platform is at your own risk.`}
        />

        {/* 10. Disclaimers */}
        <Section
          title="10. Disclaimers"
          content={`10.1 The information on our platform is provided for general purposes only and should not be considered professional advice.
10.2 Product listings are created by vendors, and we do not verify or endorse the accuracy of their claims.
10.3 We make no warranties or guarantees regarding the reliability, accuracy, or completeness of information on our platform.`}
        />

        {/* 11. Account Suspension and Termination */}
        <Section
          title="11. Account Suspension and Termination"
          content={`11.1 We reserve the right to suspend or terminate your account if you violate these Terms.
11.2 Reasons include:
- Fraudulent activity or misrepresentation.
- Repeated policy violations.
- Abuse or harassment of other users.
- Failure to fulfill orders or provide accurate information.
11.3 Terminated accounts lose access to listings, orders, and data.`}
        />

        {/* 12. Governing Law */}
        <Section
          title="12. Governing Law"
          content={`These Terms are governed by the laws of the Federal Republic of Nigeria.
Any disputes will be resolved in Nigerian courts.`}
        />

        {/* 13. Changes to Terms */}
        <Section
          title="13. Changes to Terms and Conditions"
          content={`We may update or modify these Terms at any time.
Changes will be reflected by updating the effective date and notifying users via email or on the platform.
Continued use of IndustrialMart constitutes acceptance of updated terms.`}
        />

        {/* 14. Contact Us */}
        <Section
          title="14. Contact Us"
          content={`If you have any questions or concerns, contact us:
Email: sales@industrialmartnigeria.com
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
