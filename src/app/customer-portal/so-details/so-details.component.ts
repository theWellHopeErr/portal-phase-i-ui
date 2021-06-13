import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SdService } from '../services/sd.service';

@Component({
  selector: 'app-so-details',
  templateUrl: './so-details.component.html',
  styleUrls: ['./so-details.component.css'],
})
export class SoDetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private sdService: SdService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Sales Order Details | Customer Portal`);
    this.route.params.subscribe((params) => (this.sd = params.sd));
  }

  tableConfig = {
    columns: [
      { name: 'DOC_NUMBER', title: 'Sales Document No', pipe: 'number' },
      { name: 'ITM_NUMBER', title: 'Item No.', pipe: 'number' },
      { name: 'SHORT_TEXT', title: 'Short Text', pipe: 'string' },
      { name: 'TARGET_QU', title: 'Target Quantity', pipe: 'string' },
      { name: 'DIVISION', title: 'Division', pipe: 'string' },
      { name: 'CURRENCY', title: 'Currency', pipe: 'string' },
      { name: 'UNIT_OF_WT', title: 'Unit', pipe: 'string' },
      { name: 'PLANT', title: 'Plant', pipe: 'string' },
      { name: 'CREAT_DATE', title: 'Created On', pipe: 'date' },
      { name: 'NET_PRICE', title: 'Net Price', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';
  sd: string;

  ngOnInit(): void {
    this.sdService.getSaleOrderDetails(this.sd).subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource([res.item]);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Sales Order Records found for Salesdocument: ${this.sd}`;
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`customer/so-details/${key}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
