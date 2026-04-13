/**
 * Billing & Invoicing API Adapter
 *
 * Maps the Billing API response to our internal data model.
 * Baseline schema version: 1.0
 */

export interface Invoice {
  invoiceId: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  currency: string;
  status: string;
  issuedDate: string;
  dueDate: string;
  lineItems: Array<{
    description: string;
    hours: number;
    rate: number;
    total: number;
  }>;
  taxRate: number;
  taxAmount: number;
}

export interface BillingResponse {
  invoices: Invoice[];
  meta: { page: number; perPage: number; totalRecords: number; totalPages: number };
}

/**
 * Transform raw API response to internal model.
 */
export function parseBillingResponse(raw: Record<string, unknown>): BillingResponse {
  const data = raw.data as Record<string, unknown>;
  const meta = raw.meta as Record<string, unknown>;
  const invoices = (data.invoices as Array<Record<string, unknown>>).map((inv) => ({
    invoiceId: inv.invoice_id as string,
    vendorId: inv.vendor_id as string,
    vendorName: inv.vendor_name as string,
    amount: inv.amount as number,
    currency: inv.currency as string,
    status: inv.status as string,
    issuedDate: inv.issued_date as string,
    dueDate: inv.due_date as string,
    lineItems: (inv.line_items as Array<Record<string, unknown>>).map((li) => ({
      description: li.description as string,
      hours: li.hours as number,
      rate: li.rate as number,
      total: li.total as number,
    })),
    taxRate: inv.tax_rate as number,
    taxAmount: inv.tax_amount as number,
  }));

  return {
    invoices,
    meta: {
      page: meta.page as number,
      perPage: meta.per_page as number,
      totalRecords: meta.total_records as number,
      totalPages: meta.total_pages as number,
    },
  };
}
