import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { SnackService } from 'src/app/shared/snack.service';
import { AuthService } from 'src/app/shared/auth.service';
import { LeaveQuotaDialog } from '../leave/leave.component';
import { HcmService } from '../services/hcm.service';
import { LeaveReq } from './LeaveReq';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css'],
})
export class LeaveRequestComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private hcmService: HcmService,
    private authService: AuthService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackService: SnackService
  ) {
    this.titleService.setTitle('Create Leave Request | Employee Portal');
    this.leaveReq = this.formBuilder.group(this.form);
  }

  username;
  leaveQuota;
  leaveTypes;
  loading = true;
  error;
  createLoading = false;
  createMsg = '';
  createErr = '';
  leaveReq: FormGroup;
  form: LeaveReq = {
    eid: '',
    start_date: '',
    end_date: '',
    type: '',
    reason: '',
  };

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) this.username = currentUser.username;

    this.leaveReq = this.formBuilder.group(this.form);
    this.hcmService.getLeaveData().subscribe(
      (res: any) => {
        res.details.map((o, i) => (o['sno'] = i + 1));
        this.leaveQuota = res.quota;
        this.leaveTypes = res.types;
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Leave Records found for this account. ';
        else this.error = 'Internal Server Error';
      }
    );
  }

  dateFormatter(x) {
    let date = x.getDate();
    let month = x.getMonth() + 1;
    let year = x.getFullYear();
    if (date < 10) date = `0${date}`;
    if (month < 10) month = `0${month}`;
    if (year < 10) year = `0${year}`;
    return `${year}-${month}-${date}`;
  }

  onSubmit(): void {
    const { start_date, end_date, reason, type } = this.leaveReq.value;
    if (!start_date || !end_date || !reason || !type)
      this.error = 'Fill all fields!';
    else {
      this.error = '';
      this.createMsg = '';
      this.createErr = '';
      this.createLoading = true;

      this.form = this.leaveReq.value;
      this.form.eid = this.username;
      this.form.start_date = this.dateFormatter(this.leaveReq.value.start_date);
      this.form.end_date = this.dateFormatter(this.leaveReq.value.end_date);

      this.hcmService.createLeaveRequest(this.form).subscribe(
        (res: any) => {
          if (res.error) {
            this.snackService.openSnackBar(res.error);
            this.createErr = res.error;
          } else {
            this.createMsg = `Leave Request Created Successfully`;
          }
          this.createLoading = false;
        },
        (err) => {
          console.error(err);
          this.createLoading = false;
        }
      );
    }
  }

  openLeaveTypesDialog(): void {
    this.dialog.open(LeaveTypesDialog, {
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
  selector: 'leave-types-dialog',
  templateUrl: 'leave-types-dialog.html',
  styleUrls: ['./leave-request.component.css'],
})
export class LeaveTypesDialog {
  constructor(
    public dialogRef: MatDialogRef<LeaveTypesDialog>,
    public snackService: SnackService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  tableConfig = {
    columns: [
      { name: 'AWART', title: 'Leave Code', pipe: 'default' },
      { name: 'ATEXT', title: 'Leave Type', pipe: 'default' },
      { name: 'MOABW', title: 'Subarea', pipe: 'default' },
    ],
  };

  ngOnInit(): void {
    this.tableConfig['dataSource'] = new MatTableDataSource(this.data);
  }

  copyCode(key): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = key;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackService.openSnackBar(`Leave Code ${key} Copied to Clipboard`);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
