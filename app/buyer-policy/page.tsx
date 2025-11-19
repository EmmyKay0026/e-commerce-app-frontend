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

export default function BuyerPolicy() {
  return (
    <main>
      <Hero
        title="Buyer Policy"
        subtitle="Your rights, responsibilities, and guidelines as a buyer on IndustrialMart Nigeria."
        backgroundImage="/hero-sections-img.webp"
      />

      <section className="bg-white text-gray-800">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
          
          <p className="text-gray-700">
            <strong>Last Updated:</strong> November 12, 2025
          </p>

          <p className="text-gray-700">
            Welcome to IndustrialMart Nigeria ("IndustrialMart," "we," "our," or "us"). This Buyer Policy outlines the rights, responsibilities, and expectations for all buyers and users who browse, inquire, or purchase products through{" "}
            <a href="https://www.industrialmart.ng" className="text-blue-600">
              www.industrialmart.ng
            </a>
          </p>
          
          <p className="text-gray-700">
            By accessing or using our platform, you agree to comply with this Buyer Policy as well as our Terms & Conditions, Privacy Policy, and Refund & Return Policy.
          </p>

          <Section
            title="1. Our Role as a Marketplace"
            content={`IndustrialMart Nigeria operates as an online marketplace that connects buyers and sellers of industrial products, machinery, and equipment, especially for the oil and gas, engineering, and manufacturing sectors.

We are not a manufacturer, supplier, or payment intermediary.

This means:

• We do not own or sell the products listed on our platform.
• We do not collect or hold payments on behalf of sellers.
• We do not guarantee delivery, refund, or product performance.
• All transactions occur directly between the buyer and the seller.`}
          />

          <Section
            title="2. Buyer Responsibilities"
            content={`As a buyer, you agree to:

• Carefully review product descriptions, images, and specifications before making inquiries or purchases.
• Communicate directly with sellers to confirm details such as condition, price, delivery, and warranty.
• Inspect products thoroughly before making payment or finalizing the transaction.
• Use safe, verifiable payment methods (preferably cash on delivery or verified bank transfers).
• Report any fraudulent, misleading, or suspicious listings immediately to IndustrialMart Nigeria.`}
          />

          <Section
            title="3. Payment Terms"
            content={`IndustrialMart Nigeria:

• Does not process payments on the platform.
• Does not provide escrow, refund, or compensation services.
• Will never request payment from buyers on behalf of a seller.

All payments should be made directly to the verified seller once you have confirmed product quality and authenticity.

Important:
Avoid sending money or sharing banking details with sellers before inspecting the product in person. IndustrialMart Nigeria will not be liable for any financial loss due to direct payments made outside our verified process.`}
          />

          <Section
            title="4. Fairly Used and Refurbished Items"
            content={`Some sellers may offer fairly used or refurbished products. Buyers should:

• Confirm the condition of the product before purchase.
• Request photos or videos showing the item's actual state.
• Verify that the product functions as described.

If you find that a seller misrepresents a used item as new, report the listing immediately to:
📧 support@industrialmart.ng`}
          />

          <Section
            title="5. Delivery and Inspection"
            content={`Buyers are responsible for:

• Agreeing on a safe delivery or pickup location with the seller.
• Inspecting the item for completeness, functionality, and compliance before payment.
• Confirming that all parts and accessories are included as advertised.

IndustrialMart Nigeria does not control or guarantee delivery timelines or shipping quality.`}
          />

          <Section
            title="6. Refunds and Returns"
            content={`Since IndustrialMart Nigeria is not involved in payments or shipping:

• Refunds and returns are handled directly between buyer and seller.
• We do not issue refunds or replacements.
• We may assist in communication or dispute mediation if a seller fails to respond, but we do not enforce refunds.

Buyers should always request the seller's return or warranty terms before purchase.`}
          />

          <Section
            title="7. Safety and Fraud Prevention"
            content={`We take buyer safety seriously. Please follow these safety guidelines:

• Always meet sellers in secure, public, or business-friendly locations.
• Inspect products before paying.
• Never share OTPs, bank codes, or personal documents with sellers.
• Avoid offers that seem "too good to be true."
• Verify large transactions through traceable bank transfers or official invoices.

If you suspect a scam or fraudulent activity:

1. Stop communication immediately.
2. Report to IndustrialMart Nigeria at support@industrialmart.ng.
3. If necessary, report to law enforcement or the Economic and Financial Crimes Commission (EFCC).

IndustrialMart Nigeria will cooperate fully with relevant authorities.`}
          />

          <Section
            title="8. Prohibited Buyer Conduct"
            content={`Buyers must not:

• Harass, threaten, or abuse sellers or other users.
• Use the platform for fraudulent inquiries or fake purchases.
• Attempt to bypass the platform to trade unlawfully.
• Post offensive or irrelevant comments on listings.
• Engage in chargeback or false refund claims after receiving goods.

Violating these rules may result in account suspension or permanent ban.`}
          />

          <Section
            title="9. Dispute Resolution"
            content={`While IndustrialMart Nigeria is not a payment intermediary, we may help facilitate communication in case of disputes.

Our role is limited to mediation, not enforcement. If a dispute cannot be resolved between the buyer and seller, you may:

• Seek arbitration, or
• Take independent legal action under Nigerian law.`}
          />

          <Section
            title="10. Limitation of Liability"
            content={`IndustrialMart Nigeria will not be liable for:

• Product defects, non-delivery, or misrepresentation by sellers.
• Financial losses due to advance or unauthorized payments.
• Damages arising from user negligence or fraudulent third-party conduct.

All purchases are made at your own discretion and risk.`}
          />

          <Section
            title="11. Policy Updates"
            content={`We may update this Buyer Policy periodically to reflect safety measures, regulatory changes, or improvements to user experience. All changes will be reflected on this page with a new "Last Updated" date.`}
          />

          <Section
            title="12. Contact Us"
            content={`For inquiries, feedback, or fraud reports, please contact:

IndustrialMart Nigeria
📧 support@industrialmart.ng
🌐 www.industrialmart.ng`}
          />

        </div>
      </section>
    </main>
  );
}