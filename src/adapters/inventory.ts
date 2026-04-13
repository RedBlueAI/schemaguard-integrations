interface OldItem {
  id: string;
  name: string;
  unit_price: number;
}

interface NewItem {
  id: string;
  name: string;
}

interface OldInventory {
  items: OldItem[];
}

interface NewInventory {
  items: NewItem[];
}

/**
 * Type guard to check if an item is of type OldItem.
 * @param item - The item to check.
 * @returns True if the item has a 'unit_price' field, false otherwise.
 */
function isOldItem(item: any): item is OldItem {
  return 'unit_price' in item;
}

/**
 * Parses the inventory data and normalizes it to the OldInventory format.
 * If the 'unit_price' is missing, it defaults to 0.
 * @param inventory - The inventory data to parse.
 * @returns An inventory object compatible with the OldInventory interface.
 */
function parseInventory(inventory: any): OldInventory {
  if (Array.isArray(inventory.items)) {
    return {
      items: inventory.items.map(item => {
        if (isOldItem(item)) {
          return item;
        } else {
          return {
            ...item,
            unit_price: 0 // Default unit price for backward compatibility
          };
        }
      })
    };
  }
  throw new Error('Invalid inventory format');
}

/**
 * Public API to normalize inventory data.
 * @param data - The raw inventory data.
 * @returns A normalized inventory object.
 */
export function normalizeInventoryData(data: any): OldInventory {
  return parseInventory(data);
}