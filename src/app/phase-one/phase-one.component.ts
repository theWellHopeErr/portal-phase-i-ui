import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.css'],
})
export class PhaseOneComponent implements OnInit {
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
