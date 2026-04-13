/**
 * Inventory Management API Adapter
 *
 * Maps the Inventory API response to our internal data model.
 * Baseline schema version: 1.0
 */

export interface InventoryItem {
  sku: string;
  name: string;
  quantity: number;
  warehouse: string;
  lastRestock: string;
  unitPrice: number;
  category: string;
}

export interface InventoryResponse {
  items: InventoryItem[];
  totalCount: number;
  page: number;
  perPage: number;
}

/**
 * Transform raw API response to internal model.
 */
export function parseInventoryResponse(raw: Record<string, unknown>): InventoryResponse {
  const items = (raw.items as Array<Record<string, unknown>>).map((item) => ({
    sku: item.sku as string,
    name: item.name as string,
    quantity: item.quantity as number,
    warehouse: item.warehouse as string,
    lastRestock: item.last_restock as string,
    unitPrice: item.unit_price as number,
    category: item.category as string,
  }));

  return {
    items,
    totalCount: raw.total_count as number,
    page: raw.page as number,
    perPage: raw.per_page as number,
  };
}
