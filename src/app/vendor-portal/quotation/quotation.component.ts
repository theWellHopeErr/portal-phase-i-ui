import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MmService } from '../services/mm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
})
export class QuotationComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private mmService: MmService,
    private router: Router
  ) {
    this.titleService.setTitle('Request for Quotation List | Vendor Portal');
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
    this.mmService.getRFQList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error =
            'No Request for Quotation Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`vendor/quotation-details/${key}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
