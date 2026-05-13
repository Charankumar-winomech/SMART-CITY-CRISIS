import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input({ required: true }) activeAlertCount = 0;

  now = new Date();

  private clockSub?: Subscription;

  ngOnInit(): void {
    this.clockSub = interval(1000)
      .pipe(startWith(0))
      .subscribe(() => {
        this.now = new Date();
      });
  }

  ngOnDestroy(): void {
    this.clockSub?.unsubscribe();
  }
}

