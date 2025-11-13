import React from "react";
import Hero from "@/components/organisms/SharedHeroSection";

export default function PaymentPolicy() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="Payment Policy"
        subtitle="Understand how payments are handled on IndustrialMart Nigeria and the responsibilities of both buyers and sellers."
        backgroundImage="/hero-sections-img.png"
      />

      {/* Main Content */}
      <PaymentContent />
    </main>
  );
}

/* ---------------- MAIN CONTENT ---------------- */
function PaymentContent() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
        <p className="text-base text-gray-500">
          <strong>Last Updated:</strong> November 12, 2025
        </p>

        <p className="text-gray-700 leading-relaxed">
          Welcome to IndustrialMart Nigeria (“we,” “our,” or “us”). This Payment
          Policy explains how payments are handled on our marketplace platform,
          <strong> www.industrialmart.ng</strong>, and outlines the
          responsibilities of buyers and sellers regarding all financial
          transactions. <br />
          <br />
          By using our Platform, you agree to the terms of this Payment Policy,
          as well as our Terms & Conditions and Privacy Policy.
        </p>

        <Section
          title="1. Marketplace Nature of Our Business"
          content={`IndustrialMart Nigeria is an online marketplace, not a store or direct seller.
We do not own, stock, or ship any of the products listed on our website.

We provide a platform that connects verified sellers and buyers of industrial products, equipment, and services — particularly for oil and gas, construction, and manufacturing industries.

Therefore, we do not collect, process, or handle any payments between buyers and sellers.
All transactions occur directly between the buyer and the seller.`}
        />

        <Section
          title="2. No Payment Processing or Escrow"
          content={`IndustrialMart Nigeria:
- Does not act as a payment intermediary, escrow agent, or guarantor of any transaction.
- Does not receive, hold, or refund money on behalf of buyers or sellers.
- Does not process card payments or mobile money transactions.

All payments are handled independently between the two parties (buyer and seller), using mutually agreed payment methods such as:
• Bank transfer
• Cash on delivery
• Company cheque (if agreed by seller)`}
        />

        <Section
          title="3. Buyer Payment Guidelines"
          content={`To ensure safe transactions:
- Do not make advance or upfront payments before seeing and verifying the product.
- Inspect items in person before making payment, especially for high-value or technical goods.
- Meet in secure, public, or company-approved locations when inspecting goods.
- If a seller insists on pre-payment before inspection, proceed with extreme caution or report the listing to us immediately.

IndustrialMart Nigeria will never ask you to pay money to “unlock,” “reserve,” or “verify” a product or account.`}
        />

        <Section
          title="4. Seller Payment Guidelines"
          content={`Sellers are responsible for:
- Agreeing on safe and traceable payment methods with buyers.
- Issuing invoices or receipts for company-to-company transactions.
- Delivering the product only after confirming full payment or upon agreed terms.
- Avoiding misleading or fraudulent payment requests.

Sellers found requesting fake deposits, advance payments under false pretenses, or scam-related activity will have their accounts permanently banned and may face legal action.`}
        />

        <Section
          title="5. Fraud Prevention and Security"
          content={`We prioritize your safety and encourage users to follow these best practices:
- Never share banking or card details over chat.
- Avoid third-party agents claiming to represent IndustrialMart Nigeria.
- Report suspicious sellers or buyers via support@industrialmart.ng.
- Verify business registration documents for corporate transactions.

Our platform includes automated fraud monitoring systems and a manual verification process for industrial sellers to enhance trust and authenticity.`}
        />

        <Section
          title="6. IndustrialMart Nigeria’s Limited Liability"
          content={`Since we do not process payments, we are not responsible for:
- Any financial losses or disputes between buyers and sellers.
- Non-delivery, defective goods, or false representations made by sellers.
- Refunds, chargebacks, or repayment of any transaction.

All claims or disputes related to payment or product issues must be resolved directly between the parties involved.`}
        />

        <Section
          title="7. Advertising and Premium Services"
          content={`Payments made directly to IndustrialMart Nigeria apply only to:
- Advertising packages
- Featured or Premium listings
- Seller membership or verification plans

These payments are non-refundable once the service has been delivered, unless otherwise stated in a written agreement.`}
        />

        <Section
          title="8. Reporting Payment Issues"
          content={`If you believe you have been defrauded or scammed:
1. Do not send additional money.
2. Gather evidence (screenshots, messages, receipts).
3. Report the incident immediately to: 📧 support@industrialmart.ng
4. You may also contact law enforcement (e.g., EFCC or the Nigeria Police Cybercrime Unit).

IndustrialMart will cooperate with authorities to assist in investigations.`}
        />

        <Section
          title="9. Changes to This Payment Policy"
          content={`We may update this Payment Policy periodically to reflect changes in our business model, safety practices, or legal requirements.
Any changes will be posted on this page with a new “Last Updated” date.`}
        />

        <Section
          title="10. Contact Us"
          content={`For any questions or concerns about this Payment Policy, contact us at:
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
      <p
        className="text-gray-700 whitespace-pre-line leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
