import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MmService } from '../services/mm.service';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.css'],
})
export class PurchaseOrderDetailsComponent implements OnInit {
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
      { name: 'PO_ITEM', title: 'Item Number', pipe: 'number' },
      { name: 'CHANGED_ON', title: 'Changed On', pipe: 'date' },
      { name: 'SHORT_TEXT', title: 'Short Text', pipe: 'string' },
      { name: 'NET_PRICE', title: 'Net price', pipe: 'currency' },
      { name: 'CO_CODE', title: 'Company Code', pipe: 'string' },
      { name: 'PLANT', title: 'Plant', pipe: 'uppercase' },
      { name: 'MATERIAL', title: 'Material', pipe: 'uppercase' },
      { name: 'STATUS', title: 'Status', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';
  pd: string;

  ngOnInit(): void {
    this.mmService.getPODetails(this.pd).subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res.items);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Purchase Order Record found for Purchase Document: ${this.pd}`;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
