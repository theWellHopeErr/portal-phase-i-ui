import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cd-memo',
  templateUrl: './cd-memo.component.html',
  styleUrls: ['./cd-memo.component.css'],
})
export class CdMemoComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Credit/Demo Memo | Customer Portal');
  }

  ngOnInit(): void {}
}
