import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private titleService: Title
  ) {
    this.titleService.setTitle('Employee Portal');
  }

  cardData = {
    quotation: {
      title: 'Leave Request',
      url: '/employee/leave',
      description:
        'To view all the leave data, remaining leave quota of the employee and create requests for leave in future.',
      icon: 'date_range',
      iconColor: '#ffdb56',
    },
    purchaseOrder: {
      title: 'Pay Slip',
      url: '/employee/pay-slip',
      description:
        'To view all the pay slips for the employee on a monthly basis and to generate a PDF on request for a particular Pay Slip.',
      icon: 'request_quote',
      iconColor: '#ffa500',
    },
    receipt: {
      title: 'Notice Period',
      url: '/employee/notice',
      description:
        'To request for notice period when the employee is planning on leaving the company, once the employee is in the notice period they can view their Full & Final Settlement details.',
      icon: 'receipt_long',
      iconColor: '#ffa456',
    },
  };

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { ...this.cardData.quotation, cols: 1, rows: 1 },
          { ...this.cardData.purchaseOrder, cols: 1, rows: 1 },
          { ...this.cardData.receipt, cols: 1, rows: 1 },
        ];
      }

      return [
        { ...this.cardData.quotation, cols: 2, rows: 1 },
        { ...this.cardData.purchaseOrder, cols: 1, rows: 1 },
        { ...this.cardData.receipt, cols: 1, rows: 1 },
      ];
    })
  );
}
