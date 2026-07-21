import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Meet Shawn Dixon, coach, parent, and author of Raising an Athlete: Built for the Long Game.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
