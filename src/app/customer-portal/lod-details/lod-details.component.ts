import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SdService } from '../services/sd.service';

@Component({
  selector: 'app-lod-details',
  templateUrl: './lod-details.component.html',
  styleUrls: ['./lod-details.component.css'],
})
export class LodDetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private sdService: SdService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(`Delivery Order Details | Customer Portal`);
    this.route.params.subscribe((params) => (this.sd = params.sd));
  }

  tableConfig = {
    columns: [
      { name: 'VBELN', title: 'Sales Document No.', pipe: 'number' },
      { name: 'MATNR', title: 'Material No.', pipe: 'number' },
      { name: 'LGORT', title: 'Storage Location', pipe: 'string' },
      { name: 'WERKS', title: 'Plant', pipe: 'uppercase' },
      { name: 'ERNAM', title: 'Created By', pipe: 'string' },
      { name: 'ERDAT', title: 'Created On', pipe: 'date' },
      { name: 'ERZET', title: 'Entry Time', pipe: 'string' },
      { name: 'MATWA', title: 'Material Entered On', pipe: 'date' },
      { name: 'MEINS', title: 'Unit', pipe: 'uppercase' },
      { name: 'POSNR', title: 'Delivery item', pipe: 'number' },
      { name: 'PSTYV', title: 'Item Category', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';
  sd: string;

  ngOnInit(): void {
    this.sdService.getDeliveryDetails(this.sd).subscribe(
      (res: any) => {
        console.log(res.items);
        this.tableConfig['dataSource'] = new MatTableDataSource(res.items);
        this.loading = false;
      },
      (_err) => {
        this.error = `No Delivery Order Records found for Salesdocument: ${this.sd}`;
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
