import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HcmService } from '../services/hcm.service';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css'],
})
export class PaySlipComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private hcmService: HcmService,
    private router: Router
  ) {
    this.titleService.setTitle('Pay Slip List | Employee Portal');
  }

  tableConfig = {
    columns: [
      { name: 'SEQUENCENUMBER', title: 'Sequence No.', pipe: 'number' },
      { name: 'FPPERIOD', title: 'Financial Pay Period', pipe: 'number' },
      { name: 'PAYTYPE_TEXT', title: 'Pay Type', pipe: 'default' },
      { name: 'FPBEGIN', title: 'From', pipe: 'date' },
      { name: 'FPEND', title: 'To', pipe: 'date' },
      { name: 'PAYDATE', title: 'Pay Date', pipe: 'date' },
      { name: 'BONUSDATE', title: 'Bonus', pipe: 'number' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.hcmService.getPaySlipList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Pay Slip Record found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`employee/pay-slip/${key}`]);
  }

  goBack(): void {
    this.location.back();
  }
}
