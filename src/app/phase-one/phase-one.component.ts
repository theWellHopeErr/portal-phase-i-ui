import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.css'],
})
export class PhaseOneComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Portal Phase I');
  }

  ngOnInit(): void {}
  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
