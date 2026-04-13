export interface OldWorkOrder {
  id: string;
  assigned_tech: string;
  details: string;
}

export interface NewWorkOrder {
  id: string;
  technician: string;
  details: string;
}

export interface NormalizedWorkOrder {
  id: string;
  technician: string;
  details: string;
}

/**
 * Type guard to check if the object is an OldWorkOrder.
 * @param obj - The object to check.
 */
function isOldWorkOrder(obj: any): obj is OldWorkOrder {
  return 'assigned_tech' in obj;
}

/**
 * Type guard to check if the object is a NewWorkOrder.
 * @param obj - The object to check.
 */
function isNewWorkOrder(obj: any): obj is NewWorkOrder {
  return 'technician' in obj;
}

/**
 * Normalizes a work order object to the latest schema version.
 * Handles both old and new schema versions.
 * @param workOrder - The work order object to normalize.
 * @returns A NormalizedWorkOrder object.
 */
export function normalizeWorkOrder(workOrder: any): NormalizedWorkOrder {
  if (isOldWorkOrder(workOrder)) {
    return {
      id: workOrder.id,
      technician: workOrder.assigned_tech,
      details: workOrder.details,
    };
  } else if (isNewWorkOrder(workOrder)) {
    return {
      id: workOrder.id,
      technician: workOrder.technician,
      details: workOrder.details,
    };
  } else {
    throw new Error('Invalid work order schema');
  }
}

/**
 * Public API for adapting work orders to the latest schema.
 * @param workOrders - Array of work orders to normalize.
 * @returns Array of normalized work orders.
 */
export function adaptWorkOrders(workOrders: any[]): NormalizedWorkOrder[] {
  return workOrders.map(normalizeWorkOrder);
}