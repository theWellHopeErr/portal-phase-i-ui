import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-financial-sheet',
  templateUrl: './financial-sheet.component.html',
  styleUrls: ['./financial-sheet.component.css'],
})
export class FinancialSheetComponent implements OnInit {
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
        'For Invoice Details along with the line items data collected with IRPA.',
      icon: 'receipt',
      iconColor: '#ff8d56',
    },
    paymentAging: {
      title: 'Payment and Aging',
      url: '/customer/payments-aging',
      description: 'To display the Payments and Aging Records of the customer.',
      icon: 'featured_play_list',
      iconColor: '#ff567d',
    },
    cd: {
      title: 'Credit/Debit Memo',
      url: '/customer/cd-memo',
      description: 'To view the Credit/Debit Memo of the customer.',
      icon: 'recent_actors',
      iconColor: '#ff5666',
    },
    overall: {
      title: 'Overall Sales',
      url: '/customer/overall-sales',
      description: 'To view various visualizations of the Overall Sales Data.',
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
