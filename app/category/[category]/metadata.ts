// // app/category/[category]/metadata.ts
// import { Metadata } from "next";
// import { getCategoryByIdOrSlug } from "@/services/categoryService";

// type Props = { params: { category: string } };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { category } = params;
//   const catRes = await getCategoryByIdOrSlug(category);

//   if (!catRes) {
//     return {
//       title: "Category Not Found | Industrial Mart NG",
//       description: "The category you are looking for does not exist.",
//       robots: { index: false, follow: false },
//     };
//   }

//   const { name, description, image, slug } = catRes;

//   return {
//     title: `${name} - Industrial Equipment & Tools | Industrial Mart NG`,
//     description:
//       description ||
//       `Browse verified suppliers for ${name} in Nigeria. Wholesale prices, fast delivery, quality guaranteed.`,
//     metadataBase: new URL("https://industrialmart.ng"),
//     alternates: {
//       canonical: `https://industrialmart.ng/category/${slug}`,
//     },
//     openGraph: {
//       title: `${name} - Industrial Mart Nigeria`,
//       description: `Top ${name} from trusted Nigerian suppliers`,
//       images: [
//         {
//           url: image || "/default-category.jpg",
//           width: 1200,
//           height: 630,
//           alt: `${name} category`,
//         },
//       ],
//       url: `https://industrialmart.ng/category/${slug}`,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${name} - Industrial Mart NG`,
//       description: `Browse ${name} from verified suppliers`,
//       images: [image || "/default-category.jpg"],
//     },
//     robots: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   };
// }

// // Optional: Export schema for reuse
// export async function generateCategorySchema(params: { category: string }) {
//   const cat = await getCategoryByIdOrSlug(params.category);
//   if (!cat) return null;

//   return {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: cat.name,
//     description: cat.description || `Browse ${cat.name} products`,
//     url: `https://industrialmart.ng/category/${cat.slug}`,
//     breadcrumb: {
//       "@type": "BreadcrumbList",
//       itemListElement: [
//         {
//           "@type": "ListItem",
//           position: 1,
//           name: "Home",
//           item: "https://industrialmart.ng",
//         },
//         {
//           "@type": "ListItem",
//           position: 2,
//           name: cat.name,
//           item: `https://industrialmart.ng/category/${cat.slug}`,
//         },
//       ],
//     },
//   };
// }