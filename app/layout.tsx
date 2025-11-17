// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./provider";
import SplashCursor from "@/components/ui/splash-cursor";
import LenisController from "@/components/ui/lenis-controller";
import "./globals.css";

const siteUrl = "https://caseinn.vercel.app";
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dito Rifki Irawan",
  alternateName: "Caseinn",
  url: siteUrl,
  description: "Portfolio showcasing the work of Dito Rifki Irawan, also known as Caseinn.",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Caseinn | Portfolio of Dito Rifki Irawan",
    template: "%s | Caseinn",
  },
  description: "Personal portfolio of Dito Rifki Irawan (Caseinn) highlighting creative and technical work.",
  keywords: [
    "Caseinn",
    "Dito Rifki Irawan",
    "portfolio",
    "frontend developer",
    "web developer",
    "UI engineer",
  ],
  authors: [{ name: "Dito Rifki Irawan", url: siteUrl }],
  creator: "Dito Rifki Irawan",
  publisher: "Caseinn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Caseinn | Portfolio of Dito Rifki Irawan",
    description:
      "Discover the work, projects, and experience of Dito Rifki Irawan, also known as Caseinn.",
    siteName: "Caseinn",
    images: [
      {
        url: "/me.webp",
        width: 1200,
        height: 630,
        alt: "Portrait of Dito Rifki Irawan (Caseinn)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caseinn | Portfolio of Dito Rifki Irawan",
    description:
      "Explore the projects and skills of Dito Rifki Irawan, also known as Caseinn.",
    images: ["/me.webp"],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "1KI_k0smkrnjh8xv7tnvvsSeD9YGTbZPnxJBtKveNSE",
  },
  icons: {
    icon: "/icon.ico",
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-100 text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisController />
          {children}
          <SplashCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
