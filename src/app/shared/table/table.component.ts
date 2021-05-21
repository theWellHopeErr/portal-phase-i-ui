import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() tableConfig;
  displayedColumns: any[];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tableConfig.dataSource.sort = this.sort;
    this.tableConfig.dataSource.paginator = this.paginator;
  }

  ngAfterContentInit(): void {
    this.displayedColumns = this.tableConfig.columns.map((col) => col.name);
  }

  doFilter = (value: string) => {
    this.tableConfig.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
