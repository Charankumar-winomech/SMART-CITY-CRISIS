export type TrafficSignalStatus = 'Green' | 'Yellow' | 'Red';

export interface TrafficStatus {
  locationId: string;
  trafficVolume: number;
  avgSpeed: number;
  accidentReported: boolean;
  signalStatus: TrafficSignalStatus;
}

