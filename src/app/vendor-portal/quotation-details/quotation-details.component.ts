import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MmService } from '../services/mm.service';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.css'],
})
export class QuotationDetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private mmService: MmService,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Request for Quotation Details | Vendor Portal`);
    this.route.params.subscribe((params) => (this.pd = params.pd));
  }

  tableConfig = {
    columns: [
      { name: 'DOC_ITEM', title: 'Item Number', pipe: 'number' },
      { name: 'STATUS', title: 'Status', pipe: 'uppercase' },
      { name: 'CHANGED_ON', title: 'Changed On', pipe: 'date' },
      { name: 'MATERIAL', title: 'Material', pipe: 'number' },
      { name: 'SHORT_TEXT', title: 'Short Text', pipe: 'string' },
      { name: 'CO_CODE', title: 'Company Code', pipe: 'uppercase' },
      { name: 'NET_PRICE', title: 'Net Price', pipe: 'currency' },
      { name: 'PLANT', title: 'Plant', pipe: 'uppercase' },
      { name: 'STORE_LOC', title: 'Location', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';
  pd: string;

  ngOnInit(): void {
    this.mmService.getRFQDetails(this.pd).subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Request for Quotation Record found for Purchase Document: ${this.pd}`;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
