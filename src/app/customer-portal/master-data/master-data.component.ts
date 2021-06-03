import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { FilePondOptions, FilePond } from 'filepond';

import { SnackService } from 'src/app/shared/snack.service';
import { ProfileService } from '../services/profile.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css'],
})
export class MasterDataComponent implements OnInit {
  constructor(
    private location: Location,
    private titleService: Title,
    private profileService: ProfileService,
    private snackService: SnackService
  ) {
    this.titleService.setTitle('Master Data Upload | Customer Portal');
  }
  ngOnInit(): void {}

  @ViewChild('myPond') myPond: FilePond;

  file;
  jsonData;
  loading = false;
  pondFiles: FilePondOptions['files'] = [];
  result = [];
  pondOptions: FilePondOptions = {
    labelIdle: 'Drop file here...',
    acceptedFileTypes: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  };
  tableConfig = {
    columns: [
      { name: 'FIRST_NAME', title: 'FIRST_NAME', pipe: 'default' },
      { name: 'LAST_NAME', title: 'LAST_NAME', pipe: 'default' },
      { name: 'TELEPHONE', title: 'TELEPHONE', pipe: 'default' },
      { name: 'STREET', title: 'STREET', pipe: 'default' },
      { name: 'POSTAL_CODE', title: 'POSTAL_CODE', pipe: 'default' },
      { name: 'CITY', title: 'CITY', pipe: 'default' },
      { name: 'COUNTRY', title: 'COUNTRY', pipe: 'default' },
      { name: 'LANGUAGE', title: 'LANGUAGE', pipe: 'default' },
      { name: 'CURRENCY', title: 'CURRENCY', pipe: 'default' },
      { name: 'REGION', title: 'REGION', pipe: 'default' },
      {
        name: 'SALES_ORGANIZATION',
        title: 'SALES_ORGANIZATION',
        pipe: 'default',
      },
      {
        name: 'DISTRIBUTION_CHANNEL',
        title: 'DISTRIBUTION_CHANNEL',
        pipe: 'default',
      },
      { name: 'DIVISION', title: 'DIVISION', pipe: 'default' },
      { name: 'REFERENCE_NO', title: 'REFERENCE_NO', pipe: 'default' },
    ],
  };
  resultTableConfig = {
    columns: [
      { name: 'cust_id', title: 'Customer ID', pipe: 'default' },
      { name: 'firstname', title: 'First Name', pipe: 'default' },
      { name: 'lastname', title: 'Last Name', pipe: 'default' },
    ],
  };

  pondHandleRemoveFile(event: any) {
    this.jsonData = null;
    this.file = null;
    this.result = [];
  }

  pondHandleAddFile(event: any) {
    let workBook = null;
    const reader = new FileReader();
    this.file = event.file.file;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      this.jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.tableConfig['dataSource'] = new MatTableDataSource(
        this.jsonData.Sheet1
      );
    };
    reader.readAsBinaryString(this.file);
  }

  createData() {
    this.loading = true;
    this.jsonData.Sheet1.map((row) => {
      const masterData = {
        firstname: row.FIRST_NAME,
        lastname: row.LAST_NAME,
        tel: row.TELEPHONE,
        street: row.STREET,
        pcode: row.POSTAL_CODE,
        city: row.CITY,
        country: row.COUNTRY,
        language: row.LANGUAGE,
        curr: row.CURRENCY,
        region: row.REGION,
        sorg: row.SALES_ORGANIZATION,
        distChannel: row.DISTRIBUTION_CHANNEL,
        div: row.DIVISION,
        ref: row.REFERENCE_NO,
      };
      this.profileService.createData(masterData).subscribe(
        (res: any) => {
          this.loading = false;
          this.result.push({
            firstname: masterData.firstname,
            lastname: masterData.lastname,
            cust_id: res.cust_id,
          });
          this.resultTableConfig['dataSource'] = new MatTableDataSource(
            this.result
          );
          this.jsonData = null;
          this.pondFiles = [];
          this.file = null;
        },
        (err) => {
          this.loading = false;
          console.error(err);
          this.snackService.openSnackBar(err.err.message);
        }
      );
    });
  }

  goBack(): void {
    this.location.back();
  }
}
