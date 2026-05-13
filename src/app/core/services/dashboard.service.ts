import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, switchMap, timer } from 'rxjs';
import { CITY_API_ENDPOINTS } from '../constants/city-api.constants';
import { DashboardStatusResponse, DashboardViewModel } from '../models/dashboard.model';

const INITIAL_STATUS: DashboardStatusResponse = {
  data: {
    id: 117,
    waterLevel: {
      poondi: 4,
      cholavaram: 0,
      redhills: 161.2,
      chembarambakkam: 0
    },
    powerGrid: {
      zone1: 40216.70886,
      zone2: 24671.12462,
      zone3: 26191.80723,
      temperature: 34.75935523,
      humidity: 47.98376908
    },
    trafficStatus: {
      locationId: '2',
      trafficVolume: 682,
      avgSpeed: 75.71961722,
      accidentReported: false,
      signalStatus: 'Yellow'
    },
    weather: {
      condition: 'Rainy',
      temperature: 34.75935523,
      humidity: 47.98376908
    },
    timestamp: '2026-05-13T04:47:23.2724712Z'
  },
  activeCrises: [
    'Water Crisis: Reservoir level critically low (< 10.0)',
    'Power Crisis: High load detected (> 75000). Load shedding alert.'
  ]
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  readonly dashboard$: Observable<DashboardViewModel> = timer(0, 5000).pipe(
    switchMap(() =>
      this.http.get<DashboardStatusResponse>(CITY_API_ENDPOINTS.dashboardStatus).pipe(
        catchError((error: unknown) => {
          console.error('Dashboard API request failed. Showing mock fallback data.', error);
          return of(INITIAL_STATUS);
        })
      )
    ),
    map((status) => this.toViewModel(status)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private readonly http: HttpClient) {}

  private toViewModel(status: DashboardStatusResponse): DashboardViewModel {
    const { zone1, zone2, zone3 } = status.data.powerGrid;
    const totalLoad = zone1 + zone2 + zone3;

    return {
      ...status,
      totalLoad,
      lastUpdated: new Date(status.data.timestamp),
      powerSourceConnected: totalLoad < 100000
    };
  }

}
