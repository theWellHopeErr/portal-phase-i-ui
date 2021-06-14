import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MmService } from '../services/mm.service';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css'],
})
export class ReceiptDetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private mmService: MmService,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Goods Receipt Details | Vendor Portal`);
  }

  md;
  my;
  tableConfig = {
    columns: [
      { name: 'MATDOC_ITM', title: 'Item Number', pipe: 'number' },
      { name: 'MATERIAL', title: 'Material', pipe: 'uppercase' },
      { name: 'MOVE_TYPE', title: 'Move Type', pipe: 'uppercase' },
      { name: 'DOC_YEAR', title: 'Fiscal Year', pipe: 'uppercase' },
      { name: 'PLANT', title: 'Plant', pipe: 'uppercase' },
      { name: 'STGE_LOC', title: 'Location', pipe: 'uppercase' },
      { name: 'MAT_DOC', title: 'Document No.', pipe: 'uppercase' },
      { name: 'VENDOR', title: 'Vendor', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';
  pd: string;

  ngOnInit(): void {
    this.md = this.route.url['value'][1].path;
    this.my = this.route.url['value'][2].path;
    this.mmService.getGRDetails(this.md, this.my).subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res.items);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Goods Receipt Record found for Material Document: ${this.md}`;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
