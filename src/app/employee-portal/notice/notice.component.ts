import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { HcmService } from '../services/hcm.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private hcmService: HcmService,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle('Notice Period | Employee Portal');
  }

  mainLoading = true;
  reqLoading = false;
  error = '';
  status;
  finalSet;

  ngOnInit(): void {
    this.hcmService.checkNoticeStatus().subscribe(
      (res: any) => {
        this.status = res.message;
        this.mainLoading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Record found for this account';
        else {
          this.error = 'Internal Server Error';
          console.error(err);
        }
      }
    );
  }

  requestNotice(): void {
    this.reqLoading = true;
    this.hcmService.requestNotice().subscribe(
      (res: any) => {
        this.status = res.message;
        this.reqLoading = false;
      },
      (err) => console.error(err)
    );
  }

  cancelNotice(): void {
    this.reqLoading = true;
    this.hcmService.cancelNotice().subscribe(
      (res: any) => {
        this.status = res.message;
        this.reqLoading = false;
      },
      (err) => console.error(err)
    );
  }

  openFullSettlementDialog(): void {
    this.reqLoading = true;
    this.hcmService.getFinalSettlement().subscribe(
      (res: any) => {
        this.finalSet = res;
        this.reqLoading = false;
        this.dialog.open(FinalSettlementDialog, {
          width: '2500px',
          data: this.finalSet,
        });
      },
      (err) => console.error(err)
    );
  }

  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'final-settlement-dialog',
  templateUrl: 'final-settlement-dialog.html',
  styleUrls: ['./notice.component.css'],
})
export class FinalSettlementDialog {
  constructor(
    public dialogRef: MatDialogRef<FinalSettlementDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
