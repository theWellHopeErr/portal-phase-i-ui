import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { HcmService } from '../services/hcm.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
})
export class LeaveComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private hcmService: HcmService,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle('Leave Data | Employee Portal');
  }

  tableConfig = {
    columns: [
      { name: 'sno', title: 'S.No.', pipe: 'number' },
      { name: 'ABSENCETYPE', title: 'Leave Type', pipe: 'number' },
      {
        name: 'NAMEOFABSENCETYPE',
        title: 'Name of Leave Type',
        pipe: 'default',
      },
      { name: 'VALIDBEGIN', title: 'Leave From', pipe: 'date' },
      { name: 'VALIDEND', title: 'Leave To', pipe: 'date' },
      { name: 'ABSENCEDAYS', title: 'No. of Days', pipe: 'number' },
      { name: 'ABSENCEHOURS', title: 'No. of Hours', pipe: 'number' },
    ],
  };
  leaveQuota;
  leaveTypes;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.hcmService.getLeaveData().subscribe(
      (res: any) => {
        res.details.map((o, i) => (o['sno'] = i + 1));
        this.tableConfig['dataSource'] = new MatTableDataSource(res.details);
        this.leaveQuota = res.quota;
        this.leaveTypes = res.types;
        console.log(this.leaveQuota, this.leaveTypes);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Leave Records found for this account. Impressive!';
        else this.error = 'Internal Server Error';
      }
    );
  }

  openLeaveRequestDialog(): void {
    this.dialog.open(LeaveRequestDialog, {
      width: '2500px',
      data: this.leaveTypes,
    });
  }

  openLeaveQuotaDialog(): void {
    this.dialog.open(LeaveQuotaDialog, {
      width: '2500px',
      data: this.leaveQuota,
    });
  }

  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'leave-request-dialog',
  templateUrl: 'leave-request-dialog.html',
})
export class LeaveRequestDialog {
  constructor(
    public dialogRef: MatDialogRef<LeaveRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'leave-quota-dialog',
  templateUrl: 'leave-quota-dialog.html',
})
export class LeaveQuotaDialog {
  constructor(
    public dialogRef: MatDialogRef<LeaveQuotaDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
