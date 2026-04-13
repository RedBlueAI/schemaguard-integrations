interface OldWorkOrder {
  work_order: {
    assigned_tech: string;
    [key: string]: any;
  };
}

interface NewWorkOrder {
  work_order: {
    technician: string;
    [key: string]: any;
  };
}

interface NormalizedWorkOrder {
  work_order: {
    technician: string;
    [key: string]: any;
  };
}

/**
 * Type guard to check if the work order follows the old schema.
 * @param order - The work order to check.
 */
function isOldWorkOrder(order: any): order is OldWorkOrder {
  return order?.work_order?.assigned_tech !== undefined;
}

/**
 * Type guard to check if the work order follows the new schema.
 * @param order - The work order to check.
 */
function isNewWorkOrder(order: any): order is NewWorkOrder {
  return order?.work_order?.technician !== undefined;
}

/**
 * Normalizes a work order to the new schema format.
 * Handles both old and new schema versions.
 * @param order - The work order to normalize.
 * @returns A normalized work order with the 'technician' field.
 */
export function normalizeWorkOrder(order: any): NormalizedWorkOrder {
  if (isOldWorkOrder(order)) {
    return {
      work_order: {
        ...order.work_order,
        technician: order.work_order.assigned_tech
      }
    };
  } else if (isNewWorkOrder(order)) {
    return order;
  } else {
    throw new Error('Invalid work order schema');
  }
}

/**
 * Public API to handle work order data normalization.
 * @param order - The work order data to process.
 * @returns A normalized work order.
 */
export function processWorkOrder(order: any): NormalizedWorkOrder {
  try {
    return normalizeWorkOrder(order);
  } catch (error) {
    console.error('Failed to process work order:', error);
    throw error;
  }
}