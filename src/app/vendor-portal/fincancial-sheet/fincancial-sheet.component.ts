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
    this.titleService.setTitle('Financial Sheet | Vendor Portal');
  }

  ngOnInit(): void {}

  cardData = {
    invoice: {
      title: 'Invoice Details',
      url: '/vendor/invoice',
      description: 'For Invoice Details in the form of an Adobe Form.',
      icon: 'receipt',
      iconColor: '#8f56ff',
    },
    paymentAging: {
      title: 'Payment and Aging',
      url: '/vendor/payments-aging',
      description: 'To display the Payments and Aging Records of the vendor.',
      icon: 'featured_play_list',
      iconColor: '#007bff',
    },
    cd: {
      title: 'Credit/Debit Memo',
      url: '/vendor/cd-memo',
      description: 'To view the Credit/Debit Memo of the vendor.',
      icon: 'recent_actors',
      iconColor: '#c656ff',
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
        ];
      }

      return [
        { ...this.cardData.invoice, cols: 1, rows: 1 },
        { ...this.cardData.paymentAging, cols: 1, rows: 1 },
        { ...this.cardData.cd, cols: 2, rows: 1 },
      ];
    })
  );
}
