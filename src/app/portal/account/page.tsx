import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  await currentUser();

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Account</h1>
      <UserProfile />
    </div>
  );
}