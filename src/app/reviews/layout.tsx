import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Reviews",
  description:
    "Real feedback from parents and coaches who have experienced the principles behind Long Game.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
