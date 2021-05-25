import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css'],
})
export class MasterDataComponent implements OnInit {
  constructor(private location: Location, private titleService: Title) {
    this.titleService.setTitle('Master Data Upload | Customer Portal');
  }

  ngOnInit(): void {}
  goBack(): void {
    this.location.back();
  }
}
