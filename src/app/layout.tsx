import type { Metadata } from "next";
import { headers } from "next/headers";
import "@/lib/env";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CookieConsent } from "@/components/CookieConsent";
import { GeoProvider } from "@/components/GeoProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://longgameacademy.com"),
  title: {
    default: "Long Game Academy | Parent Development for Youth Sports Families",
    template: "%s | Long Game Academy",
  },
  description:
    "Long Game gives sports parents the guidance, perspective, and practical tools to navigate every season with confidence, helping families build resilient athletes while protecting the relationship that matters most.",
  openGraph: {
    title: "Long Game Academy | Parent Development for Youth Sports Families",
    description:
      "Guidance, perspective, and practical tools for sports parents navigating youth sports with their athlete.",
    url: "https://longgameacademy.com",
    siteName: "Long Game Academy",
    images: ["/logo-black.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long Game Academy | Parent Development for Youth Sports Families",
    description:
      "Guidance, perspective, and practical tools for sports parents navigating youth sports with their athlete.",
    images: ["/logo-black.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Vercel populates this on every edge request. Missing (local dev, another
  // host, a proxy that strips it) simply means the visitor is priced in USD.
  const country = (await headers()).get("x-vercel-ip-country");

  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased">
        <head>
          <link rel="preconnect" href="https://api.fontshare.com" />
          <link
            href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-full flex flex-col">
          <GeoProvider country={country}>{children}</GeoProvider>
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}