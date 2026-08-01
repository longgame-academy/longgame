import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { content } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserAccessType } from "@/lib/access";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessType = await getUserAccessType(userId);
  if (!accessType) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const toolId = Number(id);
  if (!Number.isInteger(toolId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [item] = await db
    .select()
    .from(content)
    .where(eq(content.id, toolId))
    .limit(1);

  if (!item || item.type !== "tool" || !item.downloadable) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowed =
    item.visibility === "both" ||
    (item.visibility === "individual" && accessType === "individual") ||
    (item.visibility === "org" && accessType === "org");

  if (!allowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!item.assetRef) {
    return NextResponse.json({ error: "File not available" }, { status: 404 });
  }

  // assetRef is admin-supplied free text, so confirm it is actually a Vercel
  // Blob URL before attaching our token to the request. Without this, a bad or
  // mistyped assetRef would send BLOB_READ_WRITE_TOKEN to an arbitrary host.
  let assetUrl: URL;
  try {
    assetUrl = new URL(item.assetRef);
  } catch {
    console.error("Content item has a non-URL assetRef:", item.id);
    return NextResponse.json({ error: "File not available" }, { status: 404 });
  }

  if (
    assetUrl.protocol !== "https:" ||
    !/(^|\.)(blob\.vercel-storage\.com|public\.blob\.vercel-storage\.com)$/.test(
      assetUrl.hostname
    )
  ) {
    console.error("Refusing to proxy non-Blob assetRef:", item.id, assetUrl.hostname);
    return NextResponse.json({ error: "File not available" }, { status: 404 });
  }

  // assetRef stores the private Blob URL — fetch it server-side with the
  // token and stream it back. Never redirect to it directly.
  let blobRes: Response;
  try {
    blobRes = await fetch(assetUrl, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
  } catch (err) {
    console.error("Blob fetch failed for content item:", item.id, err);
    return NextResponse.json({ error: "File not available" }, { status: 404 });
  }

  if (!blobRes.ok || !blobRes.body) {
    return NextResponse.json({ error: "File not available" }, { status: 404 });
  }

  // Strip anything that could break out of the quoted header value. A filename
  // containing a quote or CRLF would otherwise inject response headers.
  const rawName = decodeURIComponent(assetUrl.pathname.split("/").pop() || "");
  const filename =
    rawName.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 100) || "download";

  return new NextResponse(blobRes.body, {
    headers: {
      "Content-Type":
        blobRes.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      // Defence in depth: never let a stored file be sniffed into an
      // executable type, and keep paid content out of shared caches.
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
