import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MmService } from '../services/mm.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private mmService: MmService,
    private router: Router
  ) {
    this.titleService.setTitle('Purchase Order List | Vendor Portal');
  }

  tableConfig = {
    columns: [
      { name: 'EBELN', title: 'Document No.', pipe: 'number' },
      { name: 'BUKRS', title: 'Company Code', pipe: 'uppercase' },
      { name: 'BSART', title: 'Document Type', pipe: 'uppercase' },
      { name: 'BSTYP', title: 'Document Category', pipe: 'uppercase' },
      { name: 'EKGRP', title: 'Purchasing Group', pipe: 'uppercase' },
      { name: 'EKORG', title: 'Purchasing Organization', pipe: 'uppercase' },
      { name: 'WAERS', title: 'Currency', pipe: 'uppercase' },
      { name: 'ERNAM', title: 'Created By', pipe: 'uppercase' },
      { name: 'AEDAT', title: 'Created On', pipe: 'date' },
      { name: 'STATU', title: 'Status', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.mmService.getPOList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Purchase Order found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`vendor/po-details/${key}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
