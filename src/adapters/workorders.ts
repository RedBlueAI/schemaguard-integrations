import { WorkOrderOld, WorkOrderNew, WorkOrder } from '../models/workOrderModels';

/**
 * Type guard to check if the work order is in the old format.
 * @param workOrder - The work order object to check.
 * @returns True if the work order is in the old format, false otherwise.
 */
function isOldWorkOrder(workOrder: any): workOrder is WorkOrderOld {
  return 'assigned_tech' in workOrder;
}

/**
 * Type guard to check if the work order is in the new format.
 * @param workOrder - The work order object to check.
 * @returns True if the work order is in the new format, false otherwise.
 */
function isNewWorkOrder(workOrder: any): workOrder is WorkOrderNew {
  return 'technician' in workOrder;
}

/**
 * Adapter function to normalize work order data.
 * This function will convert both old and new format work orders into a unified format.
 * @param workOrder - The work order object to normalize.
 * @returns A normalized work order object.
 */
export function normalizeWorkOrder(workOrder: any): WorkOrder {
  if (isOldWorkOrder(workOrder)) {
    return {
      ...workOrder,
      technician: workOrder.assigned_tech,
      assigned_tech: undefined // Remove old field
    };
  } else if (isNewWorkOrder(workOrder)) {
    return workOrder;
  } else {
    throw new Error('Invalid work order format');
  }
}

/**
 * Public API for processing work orders.
 * @param workOrderData - Raw work order data to process.
 * @returns Processed work order data in a unified format.
 */
export function processWorkOrder(workOrderData: any): WorkOrder {
  try {
    return normalizeWorkOrder(workOrderData);
  } catch (error) {
    console.error('Error processing work order:', error);
    throw error;
  }
}