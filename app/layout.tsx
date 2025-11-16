import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/molecules/Footer";
import Navbar from "@/components/molecules/Navbar";
import LayoutProvider from "@/components/providers/LayoutProvider";
import AuthModal from "@/components/organisms/AuthModal";
// import { useAuthModal } from "@/store/useAuthModal";
import { useFetchDataOnMount } from "@/store/useUserStore";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import Script from "next/script";
import { preloadCategoryMaps } from "@/services/preloadCategories";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Helper: Get current pathname safely in server context
async function getPathname(): Promise<string> {
  const h = await headers();
  return h.get("x-pathname") ?? "/";
}

// DYNAMIC METADATA (runs on server)
export async function generateMetadata(): Promise<Metadata> {
  const pathname = await getPathname();

  const defaultMeta = {
    title: "Industrial Mart Nigeria | Industrial Tools & Equipment Marketplace",
    description:
      "Buy & sell industrial machinery, tools, and MRO supplies in Nigeria. Verified suppliers for oil & gas, manufacturing, and construction.",
  };

  return {
    ...defaultMeta,
    metadataBase: new URL("https://industrialmart.ng"),
    alternates: {
      canonical: `https://industrialmart.ng${pathname}`,
    },
    openGraph: {
      ...defaultMeta,
      url: `https://industrialmart.ng${pathname}`,
      siteName: "Industrial Mart Nigeria",
      images: [
        {
          url: "https://industrialmart.ng/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Industrial Mart Nigeria - Industrial Equipment Marketplace",
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      ...defaultMeta,
      creator: "@industrialmart",
      images: ["https://industrialmart.ng/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await preloadCategoryMaps();
  // useFetchDataOnMount();
  return (
    <html
      lang="en-NG"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicons.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/webp" href="/indLogo.webp" />

        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Industrial Mart Nigeria Nig Ltd",
              url: "https://industrialmart.ng",
              logo: "https://industrialmart.ng/logo.png",
              description:
                "Leading B2B marketplace for industrial equipment, tools, and MRO supplies in Nigeria.",
              sameAs: [
                "https://facebook.com/industrialmart",
                "https://twitter.com/industrialmart",
                "https://linkedin.com/company/industrialmart",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+234-800-123-4567",
                contactType: "Customer Service",
                areaServed: "NG",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "NG",
                addressRegion: "Lagos",
              },
            }),
          }}
        />

        <link rel="preconnect" href="https://images.example.com" />
        <link rel="dns-prefetch" href="https://images.example.com" />
      </head>

      <body
        className={`overflow-x-hidden overflow-y-auto max-w-dvw ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Toaster />
        <AuthModal />
        <LayoutProvider />
        {/* <SignModalManager />
              <RegisterModalManager /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
