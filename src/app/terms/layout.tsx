import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using the Long Game platform.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

