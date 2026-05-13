import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-banner.component.html',
  styleUrl: './alert-banner.component.scss'
})
export class AlertBannerComponent {
  @Input({ required: true }) alerts: string[] = [];

  iconFor(alert: string): 'water' | 'power' | 'warning' {
    const lowered = alert.toLowerCase();

    if (lowered.includes('water')) {
      return 'water';
    }

    if (lowered.includes('power')) {
      return 'power';
    }

    return 'warning';
  }
}

