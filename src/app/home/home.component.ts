import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  showPhaseOne = false;
  showPhaseTwo = false;
  showPhaseThree = false;

  ngOnInit(): void {}

  showPhase(phase: 1 | 2 | 3): void {
    console.log(phase);
    switch (phase) {
      case 1:
        this.showPhaseOne = false;
        this.showPhaseTwo = false;
        this.showPhaseThree = true;
        break;
      case 2:
        this.showPhaseOne = false;
        this.showPhaseTwo = true;
        this.showPhaseThree = false;
        break;
      case 3:
        this.showPhaseOne = false;
        this.showPhaseTwo = false;
        this.showPhaseThree = true;
        break;
    }
  }
}
