import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PowerGrid } from '../../../core/models/power.model';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) power!: PowerGrid;
  @ViewChild('chartCanvas') private chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'bar'>;
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

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          this.dataset('Zone 1', '#20b7ff', [25410, 28760, 32450, 38220, 42110, 44280, this.power.zone1]),
          this.dataset('Zone 2', '#ffd21c', [15320, 16890, 19450, 22610, 24780, 25810, this.power.zone2]),
          this.dataset('Zone 3', '#63e85d', [12460, 14250, 16870, 19520, 21090, 22640, this.power.zone3])
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
              boxWidth: 14
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(32, 183, 255, .08)' },
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
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      borderRadius: 3,
      hoverBackgroundColor: color
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

