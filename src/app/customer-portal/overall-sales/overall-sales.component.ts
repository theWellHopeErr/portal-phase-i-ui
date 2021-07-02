import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-overall-sales',
  templateUrl: './overall-sales.component.html',
  styleUrls: ['./overall-sales.component.css'],
})
export class OverallSalesComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private http: HttpClient
  ) {
    this.titleService.setTitle('Overall Sales | Customer Portal');
  }

  dataset;
  tableConfig = {
    columns: [
      { name: 'cust_id', title: 'Customer Id', pipe: 'default' },
      { name: 'gender', title: 'Gender', pipe: 'default' },
      { name: 'age', title: 'Age', pipe: 'default' },
      { name: 'annual_income', title: 'Annual Income', pipe: 'k_usd' },
      {
        name: 'spending_score',
        title: 'Spending Score (100)',
        pipe: 'default',
      },
    ],
  };
  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.http
      .get('../../assets/dataset.csv', { responseType: 'text' })
      .subscribe((data) => {
        this.tableConfig['dataSource'] = new MatTableDataSource(
          this.csvToJSON(data)
        );
      });
  }

  csvToJSON(csv) {
    let lines = [];
    const linesArray = csv.split('\n');
    linesArray.forEach((e: any) => {
      const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
      lines.push(row);
    });
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }

  goBack(): void {
    this.location.back();
  }
}
