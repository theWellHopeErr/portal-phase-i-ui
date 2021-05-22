import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SdService } from '../services/sd.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css'],
})
export class InquiryComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private sdService: SdService,
    private router: Router
  ) {
    this.titleService.setTitle('Inquiry Data | Customer Portal');
  }

  tableConfig = {
    columns: [
      { name: 'VBELN', title: 'Sales Document', pipe: 'number' },
      { name: 'AUDAT', title: 'Document Date', pipe: 'date' },
      { name: 'BSTNK', title: 'PO Number', pipe: 'number' },
      { name: 'VBTYP', title: 'Document Category', pipe: 'string' },
      { name: 'NETWR', title: 'Net Value', pipe: 'currency' },
      { name: 'WAERK', title: 'Currency', pipe: 'string' },
      { name: 'VKORG', title: 'Sales Orgnization', pipe: 'string' },
      { name: 'VTWEG', title: 'Distribution Channel', pipe: 'string' },
      { name: 'SPART', title: 'Division', pipe: 'string' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.sdService.getInquiryList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Inquiry Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`customer/inquiry-details/${key}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
