import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SdService } from '../services/sd.service';

@Component({
  selector: 'app-inquiry-details',
  templateUrl: './inquiry-details.component.html',
  styleUrls: ['./inquiry-details.component.css'],
})
export class InquiryDetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private sdService: SdService,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Inquiry Details | Customer Portal`);
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
      { name: 'NET_PRICE', title: 'Net Price', pipe: 'currency' },
    ],
  };
  loading = true;
  error = '';
  sd: string;

  ngOnInit(): void {
    this.sdService.getInquiryDetails(this.sd).subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource([res.item]);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Inquiry Records found for Salesdocument: ${this.sd}`;
      }
    );
  }

  onClicker(key): void {}

  goBack(): void {
    this.location.back();
  }
}
