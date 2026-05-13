import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TrafficStatus } from '../../../core/models/traffic.model';

@Component({
  selector: 'app-traffic-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe, TitleCasePipe],
  templateUrl: './traffic-card.component.html',
  styleUrl: './traffic-card.component.scss'
})
export class TrafficCardComponent {
  @Input({ required: true }) status!: TrafficStatus;
}

