/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://industrialmart.ng",
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    // Dynamically fetch all business slugs from DB or API
    const res = await fetch(`${config.siteUrl}/api/business-slugs`);
    const slugs = await res.json();

    return slugs.map((slug) => `/shop/${slug}`);
  },
};