import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PowerGrid } from '../../../core/models/power.model';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) power!: PowerGrid;
  @ViewChild('chartCanvas') private chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'line'>;
  private readonly labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['power'] && this.chart) {
      this.updateLatestPoint();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private createChart(): void {
    const canvas = this.chartCanvas?.nativeElement;

    if (!canvas) {
      return;
    }

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          this.dataset('Zone 1', '#20b7ff', [35410, 43100, 46350, 48120, 50180, 51950, this.power.zone1]),
          this.dataset('Zone 2', '#ffd21c', [21520, 26010, 29240, 30180, 31850, 33520, this.power.zone2]),
          this.dataset('Zone 3', '#63e85d', [10760, 14840, 16950, 18220, 20640, 22320, this.power.zone3])
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            labels: {
              color: '#e5f3ff',
              boxWidth: 24,
              usePointStyle: true,
              pointStyle: 'line'
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(32, 183, 255, .09)' },
            ticks: { color: '#dbeafe' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(32, 183, 255, .14)' },
            ticks: { color: '#dbeafe' }
          }
        }
      }
    };

    this.chart = new Chart(canvas, config);
  }

  private dataset(label: string, color: string, data: number[]) {
    return {
      label,
      data,
      borderColor: color,
      backgroundColor: `${color}22`,
      borderWidth: 3,
      fill: false,
      tension: .42,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: color,
      pointBorderColor: '#061526'
    };
  }

  private updateLatestPoint(): void {
    if (!this.chart) {
      return;
    }

    const values = [this.power.zone1, this.power.zone2, this.power.zone3];
    this.chart.data.datasets.forEach((dataset, index) => {
      dataset.data[dataset.data.length - 1] = values[index];
    });
    this.chart.update();
  }
}

