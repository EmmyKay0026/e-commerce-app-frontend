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

export default function SellerPolicy() {
  return (
    <main>
      <Hero
        title="Seller Policy (Vendor Terms and Agreement)"
        subtitle="Guidelines, obligations, and standards for vendors on IndustrialMart Nigeria."
        backgroundImage="/hero-sections-img.webp"
      />

      <section className="bg-white text-gray-800">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-16 space-y-12">
          <p className="text-gray-700">
            <strong>Last Updated:</strong> November 12, 2025
          </p>
          <p className="text-gray-700">
            Welcome to IndustrialMart Nigeria (“IndustrialMart,” “we,” “our,” or
            “us”). This Seller Policy (“Policy”) outlines the rights,
            responsibilities, and obligations of vendors who list and sell
            products on our marketplace,{" "}
            <a href="https://www.industrialmart.ng" className="text-blue-600">
              www.industrialmart.ng
            </a>
            .
          </p>
          <p className="text-gray-700">
            By registering as a seller or vendor on IndustrialMart Nigeria, you
            agree to comply with this Policy, as well as our Terms & Conditions,
            Payment Policy, and Refund and Return Policy.
          </p>

          <Section
            title="1. Marketplace Role"
            content={`IndustrialMart Nigeria is an online marketplace that connects buyers and sellers of industrial equipment, tools, and materials — particularly for oil and gas, engineering, construction, and manufacturing sectors.

We are not a manufacturer, direct seller, or payment processor. All sales, deliveries, and financial transactions occur directly between the seller and the buyer.`}
          />

          <Section
            title="2. Vendor Eligibility"
            content={`To become a seller on IndustrialMart Nigeria, you must:
- Be at least 18 years old or a legally registered business in Nigeria.
- Provide accurate and verifiable business details (e.g., company name, contact info, RC number if available).
- Agree to comply with all applicable Nigerian laws, trade regulations, and safety standards.

We reserve the right to verify any information you provide and decline or revoke vendor access at our discretion.`}
          />

          <Section
            title="3. Product Listing Rules"
            content={`Sellers must ensure that all listings are:
- Accurate, truthful, and complete.
- Include clear descriptions, specifications, and authentic images of the actual item being sold.
- Specify the condition of the item (New, Fairly Used, or Refurbished).
- Include the correct price, location, and availability.

🚫 Misrepresentation Warning:
If a seller lists a fairly used or refurbished item as new, or provides false or misleading information, IndustrialMart Nigeria reserves the right to:
- Immediately remove the listing,
- Suspend or permanently terminate the seller’s account without notice, and
- Report the activity to appropriate authorities if fraudulent intent is suspected.`}
          />

          <Section
            title="4. Prohibited Listings"
            content={`Sellers may not list, promote, or sell:
- Counterfeit, stolen, or illegal goods
- Hazardous or unregulated chemicals
- Expired or defective industrial products
- Items that violate Nigerian import/export laws
- Pornographic, offensive, or politically sensitive content
- Items infringing on intellectual property rights

We reserve the right to remove any prohibited or questionable listings at any time.`}
          />

          <Section
            title="5. Seller Responsibilities"
            content={`As a registered seller, you agree to:
- Respond promptly to buyer inquiries and messages.
- Deliver products as described and within agreed timelines.
- Honor warranties, after-sales support, or return agreements you provide.
- Maintain professional conduct at all times.
- Avoid spam, duplicate listings, or misleading advertising.`}
          />

          <Section
            title="6. Used and Refurbished Items"
            content={`We understand that the industrial sector often deals in fairly used or refurbished equipment. However, sellers must:
- Clearly label such products as “Fairly Used”, “Refurbished”, or “As-Is” in the listing title and description.
- Provide actual, unedited photos showing the product’s real condition.
- Disclose any known defects, wear, or limitations.

Failure to comply will result in:
- Immediate listing removal, and
- Account termination without prior notice.`}
          />

          <Section
            title="7. Payment and Transactions"
            content={`IndustrialMart Nigeria:
- Does not handle payments between buyers and sellers.
- Is not responsible for deposits, refunds, or financial disputes.

Sellers must:
- Agree on safe, traceable payment methods (e.g., bank transfer, cash on delivery).
- Never request payment to a personal or unrelated third-party account.
- Issue receipts or invoices for company transactions when applicable.`}
          />

          <Section
            title="8. Delivery and Returns"
            content={`Sellers are solely responsible for:
- Coordinating delivery or pickup arrangements with buyers.
- Ensuring proper packaging and timely delivery.
- Handling returns, exchanges, or refunds according to their stated policy.

Failure to deliver as promised or repeated complaints from buyers may result in account suspension or permanent removal.`}
          />

          <Section
            title="9. Seller Fees and Premium Services"
            content={`Listing basic ads is generally free, but sellers may opt for:
- Featured Listings
- Premium Storefronts
- Advertising Packages

Fees for such services are payable directly to IndustrialMart Nigeria and are non-refundable once activated.`}
          />

          <Section
            title="10. Prohibited Conduct"
            content={`Sellers must not:
- Post fake or duplicate listings
- Engage in fraudulent, misleading, or unethical sales tactics
- Use offensive or inappropriate language
- Attempt to manipulate search rankings or reviews
- Impersonate another user or company
- Sell outside the platform while using Industrial Mart for lead generation only

Any such actions may lead to immediate suspension or termination without notice.`}
          />

          <Section
            title="11. Account Suspension and Termination"
            content={`IndustrialMart Nigeria reserves the right to suspend or permanently terminate any seller account that:
- Violates this Seller Policy or our Terms & Conditions
- Receives repeated verified complaints
- Posts prohibited, false, or misleading listings
- Fails to maintain professional conduct
- Engages in fraud or misrepresentation

Termination may occur without prior notice or compensation.`}
          />

          <Section
            title="12. Indemnity"
            content={`Sellers agree to indemnify and hold harmless IndustrialMart Nigeria, its affiliates, employees, and partners from any losses, damages, or claims arising from:
- Product defects, misrepresentation, or failure to deliver
- Legal violations or customer disputes
- Use of images or content that infringe on third-party rights`}
          />

          <Section
            title="13. Policy Updates"
            content={`We may update this Seller Policy periodically to improve compliance and platform standards. All updates will be reflected on this page with a new “Last Updated” date.`}
          />

          <Section
            title="14. Contact Us"
            content={`For inquiries, complaints, or seller verification assistance, please contact:

IndustrialMart Nigeria
📧 Support@industrialmart.ng
🌐 www.industrialmart.ng`}
          />
        </div>
      </section>
    </main>
  );
}
