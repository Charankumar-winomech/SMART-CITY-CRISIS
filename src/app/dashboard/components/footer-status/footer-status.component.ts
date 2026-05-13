import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherStatus } from '../../../core/models/weather.model';

@Component({
  selector: 'app-footer-status',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './footer-status.component.html',
  styleUrl: './footer-status.component.scss'
})
export class FooterStatusComponent {
  @Input({ required: true }) weather!: WeatherStatus;
  @Input({ required: true }) lastUpdated!: Date;
}

