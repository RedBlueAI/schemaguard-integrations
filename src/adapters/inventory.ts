interface OldInventoryItem {
  sku: string;
  quantity: number;
}

interface NewInventoryItem {
  item_code: string;
  quantity: string;
}

interface NormalizedInventoryItem {
  itemCode: string;
  quantity: number;
}

/**
 * Type guard to check if the item is of type OldInventoryItem
 */
function isOldInventoryItem(item: any): item is OldInventoryItem {
  return typeof item.sku === 'string' && typeof item.quantity === 'number';
}

/**
 * Type guard to check if the item is of type NewInventoryItem
 */
function isNewInventoryItem(item: any): item is NewInventoryItem {
  return typeof item.item_code === 'string' && typeof item.quantity === 'string';
}

/**
 * Parses and normalizes inventory items to a common format.
 * Handles both old and new schema versions.
 * @param items - Array of items from the API response
 * @returns Normalized inventory items
 */
export function normalizeInventoryItems(items: any[]): NormalizedInventoryItem[] {
  return items.map(item => {
    if (isOldInventoryItem(item)) {
      return {
        itemCode: item.sku,
        quantity: item.quantity
      };
    } else if (isNewInventoryItem(item)) {
      return {
        itemCode: item.item_code,
        quantity: parseFloat(item.quantity)
      };
    } else {
      throw new Error('Invalid inventory item schema');
    }
  });
}

/**
 * Example usage of the normalizeInventoryItems function.
 */
export function processInventoryResponse(response: any): NormalizedInventoryItem[] {
  if (!Array.isArray(response.items)) {
    throw new Error('Invalid response format');
  }
  return normalizeInventoryItems(response.items);
}