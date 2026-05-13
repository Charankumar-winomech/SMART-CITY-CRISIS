import { Injectable } from '@angular/core';
import { ReservoirLevel, WaterLevels } from '../models/water.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  toReservoirLevels(levels: WaterLevels): ReservoirLevel[] {
    return [
      { key: 'poondi', label: 'Poondi', value: levels.poondi, status: this.waterStatus(levels.poondi) },
      { key: 'cholavaram', label: 'Cholavaram', value: levels.cholavaram, status: this.waterStatus(levels.cholavaram) },
      { key: 'redhills', label: 'Redhills', value: levels.redhills, status: this.waterStatus(levels.redhills) },
      {
        key: 'chembarambakkam',
        label: 'Chembarambakkam',
        value: levels.chembarambakkam,
        status: this.waterStatus(levels.chembarambakkam)
      }
    ];
  }

  countCriticalReservoirs(levels: WaterLevels): number {
    return this.toReservoirLevels(levels).filter((level) => level.value === 'Status Offline' || level.value === 0).length;
  }

  private waterStatus(value: number | 'Status Offline'): ReservoirLevel['status'] {
    if (value === 'Status Offline') {
      return 'offline';
    }

    if (value < 10) {
      return 'critical';
    }

    if (value < 30 || value > 120) {
      return 'warning';
    }

    return 'normal';
  }
}
