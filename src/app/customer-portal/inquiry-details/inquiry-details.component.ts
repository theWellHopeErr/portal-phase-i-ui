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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Inquiry Details | Customer Portal`);
    this.route.params.subscribe((params) => (this.sd = params.sd));
  }

  tableConfig = {
    columns: [
      { name: 'DOC_NUMBER', title: 'DOC_NUMBER', pipe: 'number' },
      { name: 'ITM_NUMBER', title: 'ITM_NUMBER', pipe: 'number' },
      { name: 'SHORT_TEXT', title: 'SHORT_TEXT', pipe: 'string' },
      { name: 'TARGET_QU', title: 'TARGET_QU', pipe: 'string' },
      { name: 'DIVISION', title: 'DIVISION', pipe: 'string' },
      { name: 'CURRENCY', title: 'CURRENCY', pipe: 'string' },
      { name: 'UNIT_OF_WT', title: 'UNIT_OF_WT', pipe: 'string' },
      { name: 'PLANT', title: 'PLANT', pipe: 'string' },
      { name: 'CREAT_DATE', title: 'CREAT_DATE', pipe: 'date' },
      { name: 'NET_PRICE', title: 'NET_PRICE', pipe: 'uppercase' },
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
