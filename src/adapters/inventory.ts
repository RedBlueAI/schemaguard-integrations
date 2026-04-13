interface OldItem {
  id: string;
  name: string;
  quantity: number;
  warehouse: string; // Old field name
}

interface NewItem {
  id: string;
  name: string;
  quantity: number;
  location_zone: string; // New field name
  location: {
    aisle: string;
    shelf: string;
    bin: string;
  };
}

interface NormalizedItem {
  id: string;
  name: string;
  quantity: number;
  location_zone: string;
  location?: {
    aisle: string;
    shelf: string;
    bin: string;
  };
}

/**
 * Type guard to check if an item is of type NewItem.
 * @param item - The item to check.
 */
function isNewItem(item: any): item is NewItem {
  return (
    typeof item.location_zone === 'string' &&
    typeof item.location === 'object' &&
    typeof item.location.aisle === 'string' &&
    typeof item.location.shelf === 'string' &&
    typeof item.location.bin === 'string'
  );
}

/**
 * Type guard to check if an item is of type OldItem.
 * @param item - The item to check.
 */
function isOldItem(item: any): item is OldItem {
  return typeof item.warehouse === 'string';
}

/**
 * Normalize items to a common format.
 * Handles both old and new schema versions.
 * @param items - The list of items to normalize.
 */
export function normalizeItems(items: any[]): NormalizedItem[] {
  return items.map(item => {
    if (isNewItem(item)) {
      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        location_zone: item.location_zone,
        location: item.location
      };
    } else if (isOldItem(item)) {
      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        location_zone: item.warehouse
      };
    } else {
      throw new Error('Item schema not recognized');
    }
  });
}

/**
 * Public API to handle inventory data normalization.
 * @param data - The raw data from the API.
 */
export function handleInventoryData(data: any): NormalizedItem[] {
  if (!Array.isArray(data.items)) {
    throw new Error('Invalid data format: items should be an array');
  }
  return normalizeItems(data.items);
}