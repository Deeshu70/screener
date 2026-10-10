import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: {
    default: "Screener.si — A New Perspective on the Market",
    template: "%s | Screener.si",
  },
  description: siteConfig.metaDescription,
  applicationName: "Screener.si",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Screener.si — A New Perspective on the Market",
    description: siteConfig.metaDescription,
    url: "/",
    siteName: "Screener.si",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Screener.si coming soon brand reveal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Screener.si — A New Perspective on the Market",
    description: siteConfig.metaDescription,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F8F9F6] text-[#151815]">{children}</body>
    </html>
  );
}
