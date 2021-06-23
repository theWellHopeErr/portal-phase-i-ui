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
    this.titleService.setTitle('Vendor Portal');
  }

  cardData = {
    quotation: {
      title: 'Request For Quotation',
      url: '/vendor/quotation',
      description:
        'To request a company to  provide quotation and sales information for presales data collection.',
      icon: 'receipt_long',
      iconColor: '#8f56ff',
    },
    purchaseOrder: {
      title: 'Purchase Order Data',
      url: '/vendor/purchase-order',
      description:
        'To display the purchase orders recorded between the logon vendor and the company.',
      icon: 'list_alt',
      iconColor: '#007bff',
    },
    receipt: {
      title: 'Goods Receipt',
      url: '/vendor/receipt',
      description:
        'To display the Goods Receipt deliveries recorded from the company and the logon vendor.',
      icon: 'featured_play_list',
      iconColor: '#c656ff',
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
