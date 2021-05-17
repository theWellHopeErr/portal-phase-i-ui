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
    this.titleService.setTitle('Dashboard | Customer Portal');
  }

  cardData = {
    inquiry: {
      title: 'Inquiry Data',
      url: '/customer/inquiry',
      description:
        'To request a company to  provide quotation and sales information for presales data collection.',
      icon: 'receipt_long',
      iconColor: '#ff8d56',
    },
    salesOrder: {
      title: 'Sales Order Data',
      url: '/customer/sales-order',
      description:
        'To display the sale orders recorded between the logon customer and the company.',
      icon: 'featured_play_list',
      iconColor: '#ffd356',
    },
    lod: {
      title: 'List of Delivery',
      url: '/customer/lod',
      description:
        'To view the history of deliveries recorded from the company and the logon customer.',
      icon: 'list_alt',
      iconColor: '#ff5666',
    },
  };

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { ...this.cardData.inquiry, cols: 1, rows: 1 },
          { ...this.cardData.salesOrder, cols: 1, rows: 1 },
          { ...this.cardData.lod, cols: 1, rows: 1 },
        ];
      }

      return [
        { ...this.cardData.inquiry, cols: 2, rows: 1 },
        { ...this.cardData.salesOrder, cols: 1, rows: 1 },
        { ...this.cardData.lod, cols: 1, rows: 1 },
      ];
    })
  );
}
