import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MmService } from '../services/mm.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PO } from './PO';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private mmService: MmService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle('Purchase Order List | Vendor Portal');
  }

  tableConfig = {
    columns: [
      { name: 'EBELN', title: 'Document No.', pipe: 'number' },
      { name: 'BUKRS', title: 'Company Code', pipe: 'uppercase' },
      { name: 'BSART', title: 'Document Type', pipe: 'uppercase' },
      { name: 'BSTYP', title: 'Document Category', pipe: 'uppercase' },
      { name: 'EKGRP', title: 'Purchasing Group', pipe: 'uppercase' },
      { name: 'EKORG', title: 'Purchasing Organization', pipe: 'uppercase' },
      { name: 'WAERS', title: 'Currency', pipe: 'uppercase' },
      { name: 'ERNAM', title: 'Created By', pipe: 'uppercase' },
      { name: 'AEDAT', title: 'Created On', pipe: 'date' },
      { name: 'STATU', title: 'Status', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.mmService.getPOList().subscribe(
      (res: any) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(res);
        this.loading = false;
      },
      (err) => {
        if (err.includes('404'))
          this.error = 'No Purchase Order found for this account';
        else this.error = 'Internal Server Error';
      }
    );
  }

  onClicker(key): void {
    this.loading = true;
    this.router.navigate([`vendor/po-details/${key}`]);
  }

  openCreatePODialog(): void {
    this.dialog.open(CreatePODialog, {
      width: '2500px',
    });
  }

  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'create-po-dialog',
  templateUrl: 'create-po-dialog.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class CreatePODialog {
  constructor(
    public dialogRef: MatDialogRef<CreatePODialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.purchaseOrder = this.formBuilder.group(this.form);
  }

  username;
  error;
  createLoading = false;
  createMsg = '';
  createErr = '';
  purchaseOrder: FormGroup;
  form: PO = {
    vid: '',
    comp_code: '',
    purch_org: '',
    purch_grp: '',
    plant: '',
    doc_date: '',
    del_date: '',
    material: '',
    short_txt: '',
    quantity: '',
  };

  ngOnInit(): void {
    this.purchaseOrder = this.formBuilder.group(this.form);
    const currentUser = this.authService.currentUserValue;
    if (currentUser) this.username = currentUser.username;
  }

  dateFormatter(x) {
    let date = x.getDate();
    let month = x.getMonth();
    let year = x.getFullYear();
    if (date < 10) date = `0${date}`;
    if (month < 10) month = `0${month}`;
    if (year < 10) year = `0${year}`;
    return `${date}.${month}.${year}`;
  }

  onSubmit(): void {
    const { doc_date, del_date, material, short_txt, quantity } =
      this.purchaseOrder.value;
    if (!doc_date || !del_date || !material || !short_txt || !quantity)
      this.error = 'Fill all fields!';
    else {
      this.error = '';
      this.form = this.purchaseOrder.value;
      this.form.vid = this.username;
      this.form.doc_date = this.dateFormatter(
        this.purchaseOrder.value.doc_date
      );
      this.form.del_date = this.dateFormatter(
        this.purchaseOrder.value.del_date
      );
      console.log(this.form);
      this.createMsg = 'Leave Request Created';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
