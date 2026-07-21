import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Academy",
  description: "A parent development system designed to help you navigate confidence, pressure, communication, and setbacks with your athlete.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
