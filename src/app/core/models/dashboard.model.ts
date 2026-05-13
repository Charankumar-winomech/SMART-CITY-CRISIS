import { PowerGrid } from './power.model';
import { TrafficStatus } from './traffic.model';
import { WaterLevels } from './water.model';
import { WeatherStatus } from './weather.model';

export interface DashboardData {
  id: number;
  waterLevel: WaterLevels;
  powerGrid: PowerGrid;
  trafficStatus: TrafficStatus;
  weather: WeatherStatus;
  timestamp: string;
}

export interface DashboardStatusResponse {
  data: DashboardData;
  activeCrises: string[];
}

export interface DashboardViewModel extends DashboardStatusResponse {
  totalLoad: number;
  lastUpdated: Date;
  powerSourceConnected: boolean;
}

