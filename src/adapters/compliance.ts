/**
 * Compliance & Safety API Adapter
 *
 * Maps the Compliance API response to our internal data model.
 * Baseline schema version: 1.0
 */

export interface InspectionFinding {
  findingId: string;
  severity: string;
  category: string;
  description: string;
  complianceCode: string;
  remediationDeadline: string;
  status: string;
}

export interface InspectionReport {
  reportId: string;
  facilityId: string;
  inspectionType: string;
  inspector: {
    id: string;
    name: string;
    licenseNumber: string;
    authority: string;
  };
  inspectionDate: string;
  findings: InspectionFinding[];
  overallResult: string;
  nextInspectionDue: string;
  attachments: Array<{
    fileName: string;
    fileType: string;
    url: string;
  }>;
}

/**
 * Transform raw API response to internal model.
 */
export function parseComplianceResponse(raw: Record<string, unknown>): InspectionReport {
  const report = raw.inspection_report as Record<string, unknown>;
  const inspector = report.inspector as Record<string, unknown>;
  const findings = (report.findings as Array<Record<string, unknown>>).map((f) => ({
    findingId: f.finding_id as string,
    severity: f.severity as string,
    category: f.category as string,
    description: f.description as string,
    complianceCode: f.compliance_code as string,
    remediationDeadline: f.remediation_deadline as string,
    status: f.status as string,
  }));
  const attachments = (report.attachments as Array<Record<string, unknown>>).map((a) => ({
    fileName: a.file_name as string,
    fileType: a.file_type as string,
    url: a.url as string,
  }));

  return {
    reportId: report.report_id as string,
    facilityId: report.facility_id as string,
    inspectionType: report.inspection_type as string,
    inspector: {
      id: inspector.id as string,
      name: inspector.name as string,
      licenseNumber: inspector.license_number as string,
      authority: inspector.authority as string,
    },
    inspectionDate: report.inspection_date as string,
    findings,
    overallResult: report.overall_result as string,
    nextInspectionDue: report.next_inspection_due as string,
    attachments,
  };
}
