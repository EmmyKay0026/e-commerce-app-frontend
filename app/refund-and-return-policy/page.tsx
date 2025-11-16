import Hero from "@/components/organisms/SharedHeroSection";

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

export default function RefundPolicy() {
  return (
    <main>
      <Hero
        title="Refund and Return Policy"
        subtitle="Our guidelines on refunds, returns, and dispute handling between buyers and sellers on IndustrialMart Nigeria."
        backgroundImage="/hero-sections-img.png"
      />

      <section className="bg-white text-gray-800">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
          <p className="text-gray-700">
            <strong className="">Last Updated:</strong> November 12, 2025
          </p>
          <p className="text-gray-700">
            Welcome to IndustrialMart Nigeria (“IndustrialMart,” “we,” “our,” or
            “us”). This Refund and Return Policy explains how refunds,
            exchanges, and returns are handled on our platform
            <a href="https://www.industrialmart.ng" className="text-blue-600">
              {" "}
              www.industrialmart.ng
            </a>
            . Please read this policy carefully before making or accepting any
            transaction.
          </p>

          <Section
            title="1. Marketplace Nature of Our Platform"
            content={`IndustrialMart Nigeria is an online marketplace — not a retailer, manufacturer, or direct seller.

We simply connect buyers and sellers of industrial products, machinery, and tools through our platform. All transactions, including payments, deliveries, returns, and refunds, are handled directly between the buyer and the seller.

Therefore, IndustrialMart Nigeria:
- Does not sell any items directly.
- Does not receive or refund money on behalf of any party.
- Does not guarantee or manage any refund or return process.`}
          />

          <Section
            title="2. Responsibility of Sellers"
            content={`Each seller on IndustrialMart Nigeria is independently responsible for:
- Establishing and communicating their own refund and return terms.
- Ensuring that products listed are accurately described and in working condition.
- Handling complaints, exchanges, and returns directly with buyers.

Sellers are encouraged to:
- Clearly specify return timelines and conditions in product listings.
- Respond to buyer refund requests promptly and professionally.
- Issue refunds or replacements where appropriate, especially for defective or misrepresented goods.`}
          />

          <Section
            title="3. Responsibility of Buyers"
            content={`Buyers are advised to:
- Inspect products carefully before making payment or confirming delivery.
- Confirm functionality, specifications, and authenticity at the time of purchase.
- Communicate directly with the seller regarding refund or return requests.

Since IndustrialMart does not process payments, buyers must resolve any refund matters directly with the seller.

We strongly discourage advance or pre-payments before inspecting products — especially for high-value or specialized industrial equipment.`}
          />

          <Section
            title="4. No Refunds from IndustrialMart Nigeria"
            content={`IndustrialMart Nigeria does not:
- Process refunds or returns on behalf of sellers.
- Provide replacement or compensation for defective or undelivered items.
- Intervene in financial disputes unless required by law or regulatory authorities.

All monetary disputes must be settled between the buyer and the seller.

However, IndustrialMart Nigeria reserves the right to:
- Investigate reported sellers involved in fraud or misrepresentation.
- Suspend or permanently ban accounts that repeatedly violate buyer trust or refund obligations.`}
          />

          <Section
            title="5. Dispute Assistance"
            content={`While we do not handle refunds directly, our Support Team can assist in facilitating communication between buyers and sellers in cases of misunderstanding or fraud reports.

You can reach us at:
📧 support@industrialmart.ng

Note: Our assistance is limited to communication and mediation. We do not issue refunds or enforce return terms between users.`}
          />

          <Section
            title="6. Non-Returnable Items"
            content={`The following categories are generally non-returnable, unless otherwise stated by the seller:
- Customized or made-to-order industrial parts
- Used or refurbished machinery
- Consumables (e.g., lubricants, filters, chemicals)
- Safety equipment once packaging is opened
- Electrical components that have been installed or tested`}
          />

          <Section
            title="7. Misrepresentation or Fraud"
            content={`If you suspect a fraudulent transaction or false product listing:
1. Stop further communication with the other party.
2. Do not send any money or goods.
3. Report the incident immediately to: 📧 support@industrialmart.ng
4. If necessary, file a report with law enforcement or the EFCC.

IndustrialMart Nigeria will cooperate fully with authorities during investigations.`}
          />

          <Section
            title="8. No Guarantee of Outcome"
            content={`While IndustrialMart Nigeria provides a safe and secure platform, we cannot:
- Guarantee the quality, safety, or legality of items listed.
- Ensure that sellers will honor refunds or returns.
- Mediate every individual dispute to a successful conclusion.

All transactions are made at your own discretion and risk.`}
          />

          <Section
            title="9. Updates to This Policy"
            content={`We may revise this Refund and Return Policy periodically to reflect new safety measures, business practices, or legal requirements. All updates will be published on this page with a new “Last Updated” date.`}
          />

          <Section
            title="10. Contact Us"
            content={`For questions or concerns about refunds, returns, or product disputes, contact:

IndustrialMart Nigeria
📧 support@industrialmart.ng
🌐 www.industrialmart.ng`}
          />
        </div>
      </section>
    </main>
  );
}
