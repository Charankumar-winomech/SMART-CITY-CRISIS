import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  private readonly dashboardUpdates = new Subject<unknown>();

  readonly dashboardUpdates$: Observable<unknown> = this.dashboardUpdates.asObservable();

  connect(): void {
    // Ready for @microsoft/signalr HubConnection wiring.
  }

  disconnect(): void {
    this.dashboardUpdates.complete();
  }

  pushMockUpdate(payload: unknown): void {
    this.dashboardUpdates.next(payload);
  }
}

