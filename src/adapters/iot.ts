/**
 * IoT Sensor Data API Adapter
 *
 * Maps the IoT API response to our internal data model.
 * Baseline schema version: 1.0
 */

export interface SensorReading {
  timestamp: string;
  temperatureF: number;
  humidityPct: number;
  powerKw: number;
  filterPressureDelta: number;
  compressorStatus: string;
}

export interface IoTDeviceResponse {
  deviceId: string;
  deviceType: string;
  location: string;
  readings: SensorReading[];
  alerts: unknown[];
  firmwareVersion: string;
  lastMaintenance: string;
}

/**
 * Transform raw API response to internal model.
 */
export function parseIoTResponse(raw: Record<string, unknown>): IoTDeviceResponse {
  const readings = (raw.readings as Array<Record<string, unknown>>).map((r) => {
    const metrics = r.metrics as Record<string, unknown>;
    return {
      timestamp: r.timestamp as string,
      temperatureF: metrics.temperature_f as number,
      humidityPct: metrics.humidity_pct as number,
      powerKw: metrics.power_kw as number,
      filterPressureDelta: metrics.filter_pressure_delta as number,
      compressorStatus: metrics.compressor_status as string,
    };
  });

  return {
    deviceId: raw.device_id as string,
    deviceType: raw.device_type as string,
    location: raw.location as string,
    readings,
    alerts: raw.alerts as unknown[],
    firmwareVersion: raw.firmware_version as string,
    lastMaintenance: raw.last_maintenance as string,
  };
}
