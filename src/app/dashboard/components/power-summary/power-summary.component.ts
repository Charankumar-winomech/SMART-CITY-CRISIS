import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PowerGrid } from '../../../core/models/power.model';

@Component({
  selector: 'app-power-summary',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './power-summary.component.html',
  styleUrl: './power-summary.component.scss'
})
export class PowerSummaryComponent {
  @Input({ required: true }) power!: PowerGrid;
  @Input({ required: true }) totalLoad = 0;

  readonly maxLoad = 100000;

  get loadPercent(): number {
    return Math.min(this.totalLoad / this.maxLoad, 1);
  }

  get gaugeRotation(): string {
    return `${this.loadPercent * 180 - 90}deg`;
  }

  get loadStatus(): string {
    if (this.totalLoad > 75000) {
      return 'HIGH LOAD';
    }

    if (this.totalLoad > 55000) {
      return 'ELEVATED';
    }

    return 'STABLE';
  }
}

