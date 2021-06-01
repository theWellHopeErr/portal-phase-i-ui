import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-overall-sales',
  templateUrl: './overall-sales.component.html',
  styleUrls: ['./overall-sales.component.css'],
})
export class OverallSalesComponent implements OnInit {
  constructor(private titleService: Title, private location: Location) {
    this.titleService.setTitle('Overall Sales | Customer Portal');
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }
}
