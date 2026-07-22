import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  await currentUser();
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Account</h1>
      <Link
        href="/portal/join-organization"
        className="inline-block mb-6 font-body text-sm text-text-muted hover:underline"
      >
        Have an organization code? Join here
      </Link>
      <UserProfile />
    </div>
  );
}