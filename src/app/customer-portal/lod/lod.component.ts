import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lod',
  templateUrl: './lod.component.html',
  styleUrls: ['./lod.component.css'],
})
export class LodComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('List of Delivery | Customer Portal');
  }

  ngOnInit(): void {}
}
