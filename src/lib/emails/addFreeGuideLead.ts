import { mailerlite } from "@/lib/mailerlite";

export async function addFreeGuideLead(email: string, firstName: string) {
  await mailerlite.subscribers.createOrUpdate({
    email,
    fields: { name: firstName },
    groups: [process.env.MAILERLITE_FREE_GUIDE_GROUP_ID!],
  });
}
