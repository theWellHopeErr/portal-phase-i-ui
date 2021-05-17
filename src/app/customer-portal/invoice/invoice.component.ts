import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Invoice Details | Customer Portal');
  }

  ngOnInit(): void {}
}
