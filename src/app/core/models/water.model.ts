export interface WaterLevels {
  poondi: number | 'Status Offline';
  cholavaram: number | 'Status Offline';
  redhills: number | 'Status Offline';
  chembarambakkam: number | 'Status Offline';
}

export interface ReservoirLevel {
  key: keyof WaterLevels;
  label: string;
  value: number | 'Status Offline';
  status: 'critical' | 'warning' | 'normal' | 'offline';
}

