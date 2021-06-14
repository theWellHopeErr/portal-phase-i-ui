import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MmService } from '../services/mm.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private mmService: MmService,
    private router: Router
  ) {
    this.titleService.setTitle('Goods Receipt List | Vendor Portal');
  }

  tableConfig = {
    columns: [
      { name: 'MBLNR', title: 'Material Document No.', pipe: 'number' },
      { name: 'MJAHR', title: 'Material Year', pipe: 'number' },
      { name: 'MATNR', title: 'Material No.', pipe: 'uppercase' },
      { name: 'LGORT', title: 'Location', pipe: 'uppercase' },
      { name: 'WAERS', title: 'Currency', pipe: 'uppercase' },
      { name: 'WERKS', title: 'Plant', pipe: 'uppercase' },
      { name: 'ZEILE', title: 'Rows', pipe: 'number' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.mmService.getGRList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Goods Receipt Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`vendor/receipt-details/${key}/2015`]);
  }

  goBack(): void {
    this.location.back();
  }
}
