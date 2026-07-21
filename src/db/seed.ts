import { db } from "./index";
import { organizations, orgCodes, content } from "./schema";

async function seed() {
  console.log("Seeding...");

  const [org] = await db
    .insert(organizations)
    .values({
      name: "Test Youth Club",
      contactName: "Jane Coach",
      contactEmail: "jane@testclub.com",
      status: "verified",
    })
    .returning();

  await db.insert(orgCodes).values({
    organizationId: org.id,
    code: "TESTCLUB1",
    maxUses: 50,
  });

  const modules = Array.from({ length: 12 }, (_, i) => ({
    type: "module" as const,
    title: `Module ${i + 1}: Placeholder Title`,
    body: "Placeholder body content for testing.",
    visibility: "both" as const,
    downloadable: false,
    order: i + 1,
  }));

  const fieldGuides = Array.from({ length: 5 }, (_, i) => ({
    type: "field_guide" as const,
    title: `Field Guide ${i + 1}: Placeholder`,
    body: "Placeholder field guide content.",
    visibility: "both" as const,
    downloadable: true,
    assetRef: `field-guide-${i + 1}.pdf`,
    order: i + 1,
  }));

  const tools = Array.from({ length: 4 }, (_, i) => ({
    type: "tool" as const,
    title: `Tool ${i + 1}: Placeholder`,
    body: "Placeholder tool description.",
    visibility: "both" as const,
    downloadable: true,
    assetRef: `tool-${i + 1}.pdf`,
    order: i + 1,
  }));

  await db.insert(content).values([...modules, ...fieldGuides, ...tools]);

  console.log("Seed complete.");
  console.log(`Test org code: TESTCLUB1`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
