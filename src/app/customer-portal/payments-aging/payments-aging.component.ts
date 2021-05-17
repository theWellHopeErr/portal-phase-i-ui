import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payments-aging',
  templateUrl: './payments-aging.component.html',
  styleUrls: ['./payments-aging.component.css'],
})
export class PaymentsAgingComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Payments and Aging | Customer Portal');
  }
  ngOnInit(): void {}
}
