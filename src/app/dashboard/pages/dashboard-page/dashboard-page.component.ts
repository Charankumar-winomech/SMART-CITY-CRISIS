import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardViewModel } from '../../../core/models/dashboard.model';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AlertBannerComponent } from '../../components/alert-banner/alert-banner.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { FooterStatusComponent } from '../../components/footer-status/footer-status.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { PowerSummaryComponent } from '../../components/power-summary/power-summary.component';
import { RadialNetworkComponent } from '../../components/radial-network/radial-network.component';
import { TrafficCardComponent } from '../../components/traffic-card/traffic-card.component';
import { WaterCardComponent } from '../../components/water-card/water-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AlertBannerComponent,
    WaterCardComponent,
    RadialNetworkComponent,
    TrafficCardComponent,
    PowerSummaryComponent,
    LineChartComponent,
    BarChartComponent,
    FooterStatusComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  private readonly dashboardService = inject(DashboardService);
  readonly vm$: Observable<DashboardViewModel> = this.dashboardService.dashboard$;
}
