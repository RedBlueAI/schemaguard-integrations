interface OldItem {
  quantity: number;
  location: {
    warehouse: string;
    region: 'Southeast' | string;
  };
}

interface NewItem {
  quantity: string;
  location: {
    region: 'Unknown' | string;
  };
}

interface NormalizedItem {
  quantity: number;
  location: {
    warehouse: string | null;
    region: string;
  };
}

/**
 * Type guard for OldItem
 */
function isOldItem(item: any): item is OldItem {
  return typeof item.quantity === 'number' &&
         typeof item.location.warehouse === 'string';
}

/**
 * Type guard for NewItem
 */
function isNewItem(item: any): item is NewItem {
  return typeof item.quantity === 'string' &&
         item.location.warehouse === undefined;
}

/**
 * Normalize item to a common structure
 * @param item - The item to normalize
 * @returns NormalizedItem
 */
function normalizeItem(item: OldItem | NewItem): NormalizedItem {
  if (isOldItem(item)) {
    return {
      quantity: item.quantity,
      location: {
        warehouse: item.location.warehouse,
        region: item.location.region === 'Southeast' ? 'Southeast' : item.location.region
      }
    };
  }

  if (isNewItem(item)) {
    return {
      quantity: parseFloat(item.quantity),
      location: {
        warehouse: null,
        region: item.location.region === 'Unknown' ? 'Southeast' : item.location.region
      }
    };
  }

  throw new Error('Invalid item schema');
}

/**
 * Normalize a list of items
 * @param items - The list of items to normalize
 * @returns Array of NormalizedItem
 */
export function normalizeItems(items: Array<OldItem | NewItem>): NormalizedItem[] {
  return items.map(normalizeItem);
}