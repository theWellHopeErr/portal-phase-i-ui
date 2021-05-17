import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Sales Order Data | Customer Portal');
  }

  ngOnInit(): void {}
}
