import { SUPPORT_EMAIL } from "@/lib/legal";

/**
 * Shown in place of Library content once the 12-month bonus has ended.
 *
 * The Parent Academy itself is unaffected — it was the purchase, and it does
 * not expire — so the copy points people back to it rather than implying they
 * have lost what they bought.
 */
export function LibraryExpiredNotice({
  title,
  expiresAt,
}: {
  title: string;
  expiresAt: Date | null;
}) {
  const ended = expiresAt
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(expiresAt)
    : null;

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">{title}</h1>

      <div className="bg-cream border border-border-grey rounded-2xl p-8 max-w-xl">
        <p className="font-heading text-[13px] font-semibold tracking-widest uppercase eyebrow text-teal">
          Bonus Access Ended
        </p>
        <h2 className="font-heading text-xl font-bold mb-3">
          Your 12 months of bonus Library access have ended.
        </h2>
        <p className="font-body text-sm text-text-body leading-relaxed mb-4">
          {ended
            ? `Your bonus access ran through ${ended}.`
            : "Your bonus access period has finished."}{" "}
          Your Parent Academy is unaffected &mdash; all 12 modules are still
          yours and do not expire.
        </p>
        <p className="font-body text-sm text-text-body leading-relaxed">
          Nothing was charged to renew this, and nothing will be. If you&apos;d
          like another year of Library access, or you think this is a mistake,
          contact us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
