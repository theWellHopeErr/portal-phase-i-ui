import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { FiService } from '../services/fi.service';

@Component({
  selector: 'app-payments-aging',
  templateUrl: './payments-aging.component.html',
  styleUrls: ['./payments-aging.component.css'],
})
export class PaymentsAgingComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private fiService: FiService
  ) {
    this.titleService.setTitle('Payments & Aging | Customer Portal');
  }

  tableConfig = {
    columns: [
      { name: 'DOC_NO', title: 'Invoice Number', pipe: 'number' },
      { name: 'FISC_YEAR', title: 'Fiscal Year', pipe: 'number' },
      { name: 'AMOUNT', title: 'Total Amount', pipe: 'currency' },
      { name: 'CURRENCY', title: 'Currency', pipe: 'string' },
      { name: 'DOC_TYPE', title: 'Document Type', pipe: 'string' },
      { name: 'ENTRY_DATE', title: 'Billing Date', pipe: 'date' },
      { name: 'BLINE_DATE', title: 'Due Date', pipe: 'date' },
      { name: 'AGING', title: 'Aging', pipe: 'strinag' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.fiService.getPaymentsAging().subscribe(
      (res: any) => {
        res.map((o) => {
          o.AGING = this.diff(
            Date.parse(o.ENTRY_DATE),
            Date.parse(o.BLINE_DATE)
          );
        });
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Payment Records found for this account`;
      }
    );
  }

  diff(d1: number, d2: number): string {
    const diffTime = Math.abs(d2 - d1);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 + 1));
    const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    let diff = '';
    if (years) diff += `${years} ${years == 1 ? 'Year' : 'Years'}, `;
    if (months) diff += `${months} ${months == 1 ? 'Month' : 'Months'}, `;
    if (days) diff += `${days} ${days == 1 ? 'Day' : 'Days'}, `;
    if (diff === '') diff = '0 Days';
    return diff;
  }

  goBack(): void {
    this.location.back();
  }
}
