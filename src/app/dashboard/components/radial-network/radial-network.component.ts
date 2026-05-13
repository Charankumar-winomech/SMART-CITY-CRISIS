import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radial-network',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radial-network.component.html',
  styleUrl: './radial-network.component.scss'
})
export class RadialNetworkComponent {
  @Input() powerSourceConnected = true;

  get statusLabel(): string {
    return this.powerSourceConnected ? 'WARNING' : 'DISCONNECTED';
  }
}

