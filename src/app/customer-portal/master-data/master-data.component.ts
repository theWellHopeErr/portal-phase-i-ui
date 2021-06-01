import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { FilePondOptions, FilePond } from 'filepond';

import { SnackService } from 'src/app/shared/snack.service';
import { ProfileService } from '../services/profile.service';

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
  jsonDataArray = [];
  loading = false;
  cust_id;
  pondOptions: FilePondOptions = {
    labelIdle: 'Drop file here...',
    acceptedFileTypes: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  };
  pondFiles: FilePondOptions['files'] = [];

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleRemoveFile(event: any) {
    this.jsonData = null;
    this.jsonDataArray = [];
    this.file = null;
    this.cust_id = null;
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
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

      Object.keys(this.jsonData.Sheet1[0]).map((o) => {
        this.jsonDataArray.push({
          key: o.replace('_', ' '),
          value: this.jsonData.Sheet1[0][o],
        });
      });
    };
    reader.readAsBinaryString(this.file);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event);
  }

  createData() {
    this.loading = true;
    const masterData = {
      firstname: this.jsonData.Sheet1[0].FIRST_NAME,
      lastname: this.jsonData.Sheet1[0].LAST_NAME,
      tel: this.jsonData.Sheet1[0].TELEPHONE,
      street: this.jsonData.Sheet1[0].STREET,
      pcode: this.jsonData.Sheet1[0].POSTAL_CODE,
      city: this.jsonData.Sheet1[0].CITY,
      country: this.jsonData.Sheet1[0].COUNTRY,
      language: this.jsonData.Sheet1[0].LANGUAGE,
      curr: this.jsonData.Sheet1[0].CURRENCY,
      region: this.jsonData.Sheet1[0].REGION,
      sorg: this.jsonData.Sheet1[0].SALES_ORGANIZATION,
      distChannel: this.jsonData.Sheet1[0].DISTRIBUTION_CHANNEL,
      div: this.jsonData.Sheet1[0].DIVISION,
      ref: this.jsonData.Sheet1[0].REFERENCE_NO,
    };
    this.profileService.createData(masterData).subscribe(
      (res) => {
        this.loading = false;
        this.cust_id = res['cust_id'];
        this.snackService.openSnackBar('Record Created!!');
        this.jsonData = null;
        this.jsonDataArray = [];
        this.pondFiles = [];
        this.file = null;
      },
      (err) => {
        this.loading = false;
        console.error(err);
        this.snackService.openSnackBar(err.err.message);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
