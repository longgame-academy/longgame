/**
 * Copy that has to read identically wherever it appears — checkout, FAQ, the
 * Terms/refund policy, the receipt email and anything support-facing.
 *
 * These are deliberately constants rather than repeated prose. The guarantee in
 * particular is a commitment the business has to honour exactly as written, so
 * there must be exactly one wording of it.
 */

export const SUPPORT_EMAIL = "hello@longgameacademy.com";

export const GUARANTEE_TITLE = "14-Day Satisfaction Guarantee";

/** The rule itself. Used wherever the guarantee is stated in one line. */
export const GUARANTEE_SENTENCE =
  "Full refund available within 14 days, provided no more than 25% of the Parent Development System has been consumed.";

/** The rule plus its consequence, for the pricing card and policy pages. */
export const GUARANTEE_FULL =
  `${GUARANTEE_SENTENCE} If more than 25% of the content has been completed, no refund will be issued.`;

/**
 * Library and other bonus usage is explicitly outside the 25% condition, which
 * is measured against the Parent Development System only.
 */
export const GUARANTEE_LIBRARY_NOTE =
  "Use of the Long Game Library and other bonus content does not count toward the 25% condition, which applies to the Parent Development System only.";

/** Stated wherever the offer is described, so it can never read as a plan. */
export const NO_RENEWAL_LINE =
  "One-time payment · No subscription · No automatic renewal";
