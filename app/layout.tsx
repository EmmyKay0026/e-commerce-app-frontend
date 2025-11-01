import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/molecules/Footer";
import Navbar from "@/components/molecules/Navbar";
import SignModalManager from "@/components/organisms/SignModalManager";
import RegisterModalManager from "@/components/organisms/RegisterModalManager";
import AuthModal from "@/components/organisms/AuthModal";
import { useAuthModal } from "@/store/useAuthModal";
import { useFetchDataOnMount } from "@/store/useUserStore";
import { useFetchCategoriesOnMount } from "@/store/useCategoryStore";
import { BASE_URL } from "@/services/categoryService";
import Script from "next/script";
import ClientProviders from "@/lib/clientProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Industrial Mart Nigeria Nig Ltd | Leading Marketplace for Industrial Equipment & Tools",
  description:
    "Industrial Mart Nigeria Nig Ltd connects buyers and sellers across Nigeria’s industrial sectors — offering top-quality machinery, tools, and accessories from verified suppliers for oil & gas, manufacturing, and more.",
  keywords: [
    "industrial mart",
    "industrial tools Nigeria",
    "industrial equipment marketplace",
    "oil and gas tools",
    "manufacturing equipment Nigeria",
    "MRO tools",
    "industrial machinery",
    "buy and sell tools",
    "equipment suppliers Nigeria",
  ],
  authors: [{ name: "Industrial Mart Nigeria Nig Ltd" }],
  openGraph: {
    title: "Industrial Mart Nigeria Nig Ltd | Marketplace for Industrial Equipment",
    description:
      "Discover Nigeria’s trusted industrial marketplace for tools, equipment, and machinery. Connecting verified suppliers with buyers in oil & gas, manufacturing, and maintenance sectors.",
    url: "https://industrialmart.ng",
    siteName: "Industrial Mart Nigeria Nig Ltd",
    images: [
      {
        url: "https://industrialmart.ng/og-image.jpg", // replace with your actual image
        width: 1200,
        height: 630,
        alt: "Industrial Mart Nigeria Nig Ltd",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Mart Nigeria Nig Ltd",
    description:
      "Your go-to marketplace for industrial tools and equipment across Nigeria.",
    creator: "@industrialmart",
    images: ["https://industrialmart.ng/og-image.jpg"], // replace with your actual image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useFetchDataOnMount();
  // useFetchCategoriesOnMount();
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Industrial Mart Nigeria Nig Ltd",
              url: "https://industrialmart.ng",
              logo: "https://industrialmart.ng/logo.png", // update path
              description:
                "A leading marketplace for industrial equipment and tools in Nigeria, connecting buyers and sellers across oil & gas, manufacturing, and other industrial sectors.",
              sameAs: [
                "https://facebook.com/industrialmart",
                "https://twitter.com/industrialmart",
                "https://linkedin.com/company/industrialmart",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+234-XXXXXXXXXX",
                contactType: "Customer Service",
                areaServed: "NG",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`overflow-x-hidden overflow-y-auto max-w-[100dvw] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        <AuthModal />
        <ClientProviders />
        {/* <SignModalManager />
        <RegisterModalManager /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
