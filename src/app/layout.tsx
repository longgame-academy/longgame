import type { Metadata } from "next";
import "@/lib/env";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CookieConsent } from "@/components/CookieConsent";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${poppins.variable} ${lora.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          {children}
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}


