import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SdService } from '../services/sd.service';

@Component({
  selector: 'app-lod',
  templateUrl: './lod.component.html',
  styleUrls: ['./lod.component.css'],
})
export class LodComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private sdService: SdService,
    private router: Router
  ) {
    this.titleService.setTitle('Delivery Order Data | Customer Portal');
  }

  tableConfig = {
    columns: [
      { name: 'VBELN', title: 'Sales Document', pipe: 'number' },
      { name: 'AUDAT', title: 'Document Date', pipe: 'date' },
      { name: 'BSTNK', title: 'PO Number', pipe: 'string' },
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
    this.sdService.getDeliveryList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Delivery Records found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`customer/lod-details/${key}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
