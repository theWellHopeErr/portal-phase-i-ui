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
    this.titleService.setTitle('Credit/Demo Memo | Customer Portal');
  }

  creditTableConfig = {
    columns: [
      { name: 'BELNR', title: 'Invoice No.', pipe: 'number' },
      { name: 'GJAHR', title: 'Fical Year', pipe: 'string' },
      { name: 'PSWBT', title: 'Amount', pipe: 'currency' },
      { name: 'PSWSL', title: 'Currency', pipe: 'string' },
    ],
    dataSource: new MatTableDataSource<Element[]>(),
  };
  debitTableConfig = {
    columns: [
      { name: 'BELNR', title: 'Invoice No.', pipe: 'number' },
      { name: 'GJAHR', title: 'Fical Year', pipe: 'string' },
      { name: 'PSWBT', title: 'Amount', pipe: 'currency' },
      { name: 'PSWSL', title: 'Currency', pipe: 'string' },
    ],
    dataSource: new MatTableDataSource<Element[]>(),
  };

  loading = true;
  error = '';

  ngOnInit(): void {
    this.fiService.getCreditMemo().subscribe(
      (res: any) => {
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
        this.debitTableConfig['dataSource'] = new MatTableDataSource(
          res.splice(0, 7)
        );
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
