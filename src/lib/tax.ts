import { stripe } from "@/lib/stripe";

const LOG = "[tax]";

/**
 * Tax collection is off until Long Game is registered to collect it, but it is
 * a switch rather than an assumption: set STRIPE_TAX_ENABLED=true and
 * configure registrations in the Stripe dashboard, and calculated tax starts
 * flowing through checkout with no code change.
 */
export function isTaxEnabled(): boolean {
  return process.env.STRIPE_TAX_ENABLED === "true";
}

/**
 * The Stripe tax code describing what is being sold.
 *
 * This materially changes what gets collected — the same order in Texas is
 * taxed at 8.25% under the generic electronically-supplied-services code and
 * exempt under the on-demand-online-course code. Left unset, Stripe falls back
 * to the account's default code, which is unlikely to be the right one for a
 * pre-recorded video course and would be an easy way to silently under- or
 * over-collect. Set STRIPE_TAX_CODE once the correct code is confirmed.
 */
function productTaxCode(): string | undefined {
  return process.env.STRIPE_TAX_CODE?.trim() || undefined;
}

export type TaxResult = {
  /** Tax in cents. Zero means no tax row is shown to the customer. */
  taxAmount: number;
  /** Product + tax, in cents. What the customer is actually charged. */
  totalAmount: number;
  /** e.g. "GST/HST" — only meaningful when taxAmount > 0. */
  label: string | null;
  /** Stripe Tax calculation id, retained for the transaction record. */
  calculationId: string | null;
};

export type BillingAddress = {
  country: string;
  postalCode?: string | null;
  state?: string | null;
};

/**
 * Calculates tax for one order.
 *
 * When collection is disabled this returns a clean zero and the caller hides
 * the tax row — it never invents a placeholder. When enabled, the figure comes
 * from Stripe Tax against the billing address, and the calculation id is kept
 * so the transaction can be reconciled later.
 *
 * A Stripe Tax failure must not take checkout down, so it falls back to
 * charging the untaxed total rather than blocking the purchase. That is the
 * safe direction: the customer is never charged more than they were shown.
 */
export async function calculateTax(params: {
  amount: number;
  currency: string;
  address: BillingAddress;
}): Promise<TaxResult> {
  const untaxed: TaxResult = {
    taxAmount: 0,
    totalAmount: params.amount,
    label: null,
    calculationId: null,
  };

  if (!isTaxEnabled()) return untaxed;

  try {
    const calculation = await stripe.tax.calculations.create({
      currency: params.currency.toLowerCase(),
      line_items: [
        {
          amount: params.amount,
          reference: "parent_academy",
          tax_behavior: "exclusive",
          tax_code: productTaxCode(),
        },
      ],
      customer_details: {
        address: {
          country: params.address.country,
          postal_code: params.address.postalCode || undefined,
          state: params.address.state || undefined,
        },
        address_source: "billing",
      },
    });

    const taxAmount = calculation.tax_amount_exclusive ?? 0;

    if (taxAmount <= 0) return untaxed;

    return {
      taxAmount,
      totalAmount: calculation.amount_total,
      label: taxLabelFrom(calculation),
      calculationId: calculation.id ?? null,
    };
  } catch (err) {
    // Charging the shown total beats failing the sale. Loudly logged so a
    // misconfigured registration is caught rather than silently under-collected.
    console.error(`${LOG} calculation failed, charging untaxed total:`, err);
    return untaxed;
  }
}

function taxLabelFrom(calculation: {
  tax_breakdown?: Array<{ tax_rate_details?: { tax_type?: string | null } | null }> | null;
}): string {
  const type = calculation.tax_breakdown?.[0]?.tax_rate_details?.tax_type;
  if (!type) return "Tax";

  const labels: Record<string, string> = {
    gst: "GST",
    hst: "HST",
    pst: "PST",
    qst: "QST",
    rst: "RST",
    vat: "VAT",
    sales_tax: "Sales tax",
  };

  return labels[type] ?? "Tax";
}
