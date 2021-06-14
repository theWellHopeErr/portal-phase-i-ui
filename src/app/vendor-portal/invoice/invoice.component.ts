import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FiService } from 'src/app/vendor-portal/services/fi.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private fiService: FiService,
    private router: Router
  ) {
    this.titleService.setTitle('Invoice List | Vendor Portal');
  }

  tableConfig = {
    columns: [
      { name: 'INV_DOC_NO', title: 'Invoice No.', pipe: 'number' },
      { name: 'FISC_YEAR', title: 'Fiscal Year', pipe: 'number' },
      { name: 'COMP_CODE', title: 'Company Code', pipe: 'string' },
      { name: 'CURRENCY', title: 'Currency', pipe: 'string' },
      { name: 'GROSS_AMNT', title: 'Gross Amount', pipe: 'currency' },
      { name: 'INVOICE_STATUS', title: 'Status', pipe: 'uppercase' },
      { name: 'DOC_DATE', title: 'Created Date', pipe: 'date' },
      { name: 'ENTRY_TIME', title: 'Created Time', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.fiService.getInvoiceList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Invoice Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`vendor/invoice-pdf/${key}/2015`]);
  }

  goBack(): void {
    this.location.back();
  }
}
