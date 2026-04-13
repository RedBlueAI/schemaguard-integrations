type OldInventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
};

type NewInventoryItem = {
  id: string;
  name: string;
  quantity: number;
};

type InventoryResponse = {
  items: (OldInventoryItem | NewInventoryItem)[];
};

/**
 * Type guard to check if an item is in the old schema format.
 * @param item Inventory item to check.
 * @returns true if item is OldInventoryItem, otherwise false.
 */
function isOldInventoryItem(item: any): item is OldInventoryItem {
  return 'unit_price' in item;
}

/**
 * Normalizes inventory items to a common format.
 * @param item Inventory item to normalize.
 * @returns Normalized inventory item.
 */
function normalizeInventoryItem(item: OldInventoryItem | NewInventoryItem) {
  if (isOldInventoryItem(item)) {
    return {
      ...item,
      unitPrice: item.unit_price
    };
  } else {
    return {
      ...item,
      unitPrice: 0 // Default or calculated value
    };
  }
}

/**
 * Adapter function to normalize inventory response.
 * @param response Inventory API response.
 * @returns Normalized inventory response.
 */
export function adaptInventoryResponse(response: InventoryResponse) {
  return {
    items: response.items.map(normalizeInventoryItem)
  };
}
