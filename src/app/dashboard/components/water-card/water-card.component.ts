import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';
import { ReservoirLevel, WaterLevels } from '../../../core/models/water.model';

@Component({
  selector: 'app-water-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './water-card.component.html',
  styleUrl: './water-card.component.scss'
})
export class WaterCardComponent implements OnChanges {
  @Input({ required: true }) levels!: WaterLevels;

  reservoirs: ReservoirLevel[] = [];
  criticalCount = 0;

  constructor(private readonly alertService: AlertService) {}

  ngOnChanges(): void {
    this.reservoirs = this.alertService.toReservoirLevels(this.levels);
    this.criticalCount = this.alertService.countCriticalReservoirs(this.levels);
  }

  progressValue(level: ReservoirLevel): number {
    return typeof level.value === 'number' ? Math.min(level.value, 100) : 0;
  }

  displayValue(level: ReservoirLevel): string {
    return typeof level.value === 'number' ? `${level.value.toFixed(level.value % 1 === 0 ? 0 : 1)}%` : level.value;
  }
}

