type OldInventoryItem = {
  quantity: number;
  location: {
    warehouse: string;
    region: 'Southeast' | 'Northeast' | 'Midwest';
  };
};

type NewInventoryItem = {
  quantity: string;
  location: {
    region: 'Unknown' | 'Northeast' | 'Midwest';
  };
};

type InventoryItem = OldInventoryItem | NewInventoryItem;

type InventoryResponse = {
  items: InventoryItem[];
};

/**
 * Type guard to check if an item is of the old inventory schema.
 * @param item - The inventory item to check.
 * @returns True if the item is of the old schema, false otherwise.
 */
function isOldInventoryItem(item: InventoryItem): item is OldInventoryItem {
  return typeof item.quantity === 'number' && 'warehouse' in item.location;
}

/**
 * Type guard to check if an item is of the new inventory schema.
 * @param item - The inventory item to check.
 * @returns True if the item is of the new schema, false otherwise.
 */
function isNewInventoryItem(item: InventoryItem): item is NewInventoryItem {
  return typeof item.quantity === 'string' && !('warehouse' in item.location);
}

/**
 * Adapter function to normalize inventory items to a unified format.
 * @param response - The inventory response from the API.
 * @returns A normalized inventory response.
 */
export function normalizeInventoryResponse(response: InventoryResponse): InventoryResponse {
  return {
    items: response.items.map(item => {
      if (isOldInventoryItem(item)) {
        return {
          quantity: item.quantity.toString(),
          location: {
            region: item.location.region === 'Southeast' ? 'Unknown' : item.location.region,
          },
        } as NewInventoryItem;
      } else if (isNewInventoryItem(item)) {
        return item;
      } else {
        throw new Error('Invalid inventory item schema');
      }
    }),
  };
}