import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css'],
})
export class InquiryComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Inquiry Data | Customer Portal');
  }

  ngOnInit(): void {}
}
