/**
 * Work Order API Adapter
 *
 * Maps the Work Order API response to our internal data model.
 * Baseline schema version: 1.0
 */

export interface WorkOrder {
  id: string;
  status: string;
  priority: string;
  client: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  serviceType: string;
  assignedTech: {
    id: string;
    name: string;
    certifications: string[];
  };
  scheduledDate: string;
  estimatedDurationHours: number;
  partsRequired: Array<{
    partId: string;
    name: string;
    qty: number;
  }>;
  notes: string;
}

/**
 * Transform raw API response to internal model.
 */
export function parseWorkOrderResponse(raw: Record<string, unknown>): WorkOrder {
  const wo = raw.work_order as Record<string, unknown>;
  const client = wo.client as Record<string, unknown>;
  const address = client.address as Record<string, unknown>;
  const tech = wo.assigned_tech as Record<string, unknown>;
  const parts = wo.parts_required as Array<Record<string, unknown>>;

  return {
    id: wo.id as string,
    status: wo.status as string,
    priority: wo.priority as string,
    client: {
      name: client.name as string,
      address: {
        street: address.street as string,
        city: address.city as string,
        state: address.state as string,
        zip: address.zip as string,
      },
    },
    serviceType: wo.service_type as string,
    assignedTech: {
      id: tech.id as string,
      name: tech.name as string,
      certifications: tech.certifications as string[],
    },
    scheduledDate: wo.scheduled_date as string,
    estimatedDurationHours: wo.estimated_duration_hours as number,
    partsRequired: parts.map((p) => ({
      partId: p.part_id as string,
      name: p.name as string,
      qty: p.qty as number,
    })),
    notes: wo.notes as string,
  };
}
