import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

import { FiService } from '../services/fi.service';

@Component({
  selector: 'app-cd-memo',
  templateUrl: './cd-memo.component.html',
  styleUrls: ['./cd-memo.component.css'],
})
export class CdMemoComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private fiService: FiService
  ) {
    this.titleService.setTitle('Credit/Demo Memo | Vendor Portal');
  }

  creditTableConfig = {
    columns: [
      { name: 'ZFBDT', title: 'Baseline Date', pipe: 'date' },
      { name: 'PSWBT', title: 'Amount', pipe: 'string' },
      { name: 'PSWSL', title: 'Currency', pipe: 'string' },
      { name: 'GJAHR', title: 'Fical Year', pipe: 'string' },
      { name: 'BUZEI', title: 'Line Items', pipe: 'string' },
    ],
    dataSource: new MatTableDataSource<Element[]>(),
  };
  debitTableConfig = {
    columns: [
      { name: 'ZFBDT', title: 'Baseline Date', pipe: 'date' },
      { name: 'PSWBT', title: 'Amount', pipe: 'string' },
      { name: 'PSWSL', title: 'Currency', pipe: 'string' },
      { name: 'GJAHR', title: 'Fical Year', pipe: 'string' },
      { name: 'BUZEI', title: 'Line Items', pipe: 'string' },
    ],
    dataSource: new MatTableDataSource<Element[]>(),
  };

  loading = true;
  error = '';

  ngOnInit(): void {
    this.fiService.getCreditMemo().subscribe(
      (res: any) => {
        res.map((o) => (o.GJAHR = o.ZFBDT.split('-')[0]));
        this.creditTableConfig.dataSource = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Credit Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );

    this.fiService.getDebitMemo().subscribe(
      (res: any) => {
        if (res['length'] === undefined) res = [res];
        res.map((o) => (o.GJAHR = o.ZFBDT.split('-')[0]));
        this.debitTableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Debit Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
