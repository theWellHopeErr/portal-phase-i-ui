import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-fincancial-sheet',
  templateUrl: './fincancial-sheet.component.html',
  styleUrls: ['./fincancial-sheet.component.css'],
})
export class FincancialSheetComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private titleService: Title
  ) {
    this.titleService.setTitle('Financial Sheet | Customer Portal');
  }

  ngOnInit(): void {}

  cardData = {
    invoice: {
      title: 'Invoice Details',
      url: '/customer/invoice',
      description:
        'To request a company to  provide quotation and sales information for presales data collection.',
      icon: 'receipt',
      iconColor: '#ff8d56',
    },
    paymentAging: {
      title: 'Payment and Aging',
      url: '/customer/payments-aging',
      description:
        'To display the sale orders recorded between the logon customer and the company.',
      icon: 'featured_play_list',
      iconColor: '#ff567d',
    },
    cd: {
      title: 'Credit/Debit Memo',
      url: '/customer/cd-memo',
      description:
        'To view the history of deliveries recorded from the company and the logon customer.',
      icon: 'recent_actors',
      iconColor: '#ff5666',
    },
    overall: {
      title: 'Overall Sales',
      url: '/customer/overall-sales',
      description:
        'To view the history of deliveries recorded from the company and the logon customer.',
      icon: 'analytics',
      iconColor: '#ffd356',
    },
  };

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { ...this.cardData.invoice, cols: 1, rows: 1 },
          { ...this.cardData.paymentAging, cols: 1, rows: 1 },
          { ...this.cardData.cd, cols: 1, rows: 1 },
          { ...this.cardData.overall, cols: 1, rows: 1 },
        ];
      }

      return [
        { ...this.cardData.invoice, cols: 1, rows: 1 },
        { ...this.cardData.paymentAging, cols: 1, rows: 1 },
        { ...this.cardData.cd, cols: 1, rows: 1 },
        { ...this.cardData.overall, cols: 1, rows: 1 },
      ];
    })
  );
}
