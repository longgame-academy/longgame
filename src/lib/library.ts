import { getLibraryAccess } from "@/lib/orders";

export type LibraryGate = {
  allowed: boolean;
  expiresAt: Date | null;
};

/**
 * Decides whether a user can open Long Game Library content right now.
 *
 * Two deliberate rules:
 *
 * 1. Organisation members are covered by their organisation's partnership, not
 *    by the purchase bonus, so their access does not expire with it.
 *
 * 2. Access is denied only when a Library entitlement exists AND has passed its
 *    expiry. An individual with no entitlement row at all is someone who bought
 *    before the bonus was modelled — locking them out would take away access
 *    they already have, so they are allowed through.
 *
 * The expiry is evaluated at read time from the stored date, which is what
 * makes the lock automatic. Nothing is deleted when it lapses: the order and
 * entitlement history stay intact.
 */
export async function getLibraryGate(
  userId: string,
  accessType: "individual" | "org" | null
): Promise<LibraryGate> {
  if (accessType === "org") {
    return { allowed: true, expiresAt: null };
  }

  const library = await getLibraryAccess(userId);

  if (library.status === "none") {
    return { allowed: true, expiresAt: null };
  }

  return {
    allowed: library.status === "active",
    expiresAt: library.expiresAt,
  };
}
