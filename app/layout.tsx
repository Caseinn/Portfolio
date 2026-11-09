// app/layout.tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import LenisController from "@/components/ui/lenis-controller";
import { SplashCursorGate } from "@/components/ui/splash-cursor-gate";
import {
  siteDescription,
  siteFullName,
  siteName,
  siteUrl,
  socialLinks,
} from "@/lib/site";
import "./globals.css";

const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteFullName,
      alternateName: siteName,
      url: siteUrl,
      image: `${siteUrl}/me.webp`,
      jobTitle: "Web Developer",
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Lampung",
        addressCountry: "ID",
      },
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "Laravel",
        "Python",
        "Frontend Engineering",
      ],
      sameAs: socialLinks.map((social) => social.url),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
});

const archivo = localFont({
  src: "./fonts/ArchivoVF.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Portfolio of ${siteFullName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Caseinn",
    "Dito Rifki Irawan",
    "portfolio",
    "frontend developer",
    "web developer",
    "UI engineer",
  ],
  authors: [{ name: siteFullName, url: siteUrl }],
  creator: siteFullName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteName} | Portfolio of ${siteFullName}`,
    description: siteDescription,
    siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Caseinn — Dito Rifki Irawan, web developer in Lampung, Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Portfolio of ${siteFullName}`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Caseinn — Dito Rifki Irawan, web developer in Lampung, Indonesia",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "1KI_k0smkrnjh8xv7tnvvsSeD9YGTbZPnxJBtKveNSE",
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#16241d",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body
        className={`${archivo.variable} ${geistMono.variable} wall-grain bg-wall text-bone antialiased`}
      >
        <LenisController />
        <SplashCursorGate />
        {children}
      </body>
    </html>
  );
}
