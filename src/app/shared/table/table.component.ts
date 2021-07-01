import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackService } from '../snack.service';
import { LeaveTypesDialog } from 'src/app/employee-portal/leave-request/leave-request.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() tableConfig;
  @Input() onClicker: (args: any) => void;
  displayedColumns: any[];
  isClickable: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public snackService: SnackService,
    public dialogRef: MatDialogRef<LeaveTypesDialog>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tableConfig.dataSource.sort = this.sort;
    this.tableConfig.dataSource.paginator = this.paginator;
  }

  ngAfterContentInit(): void {
    this.displayedColumns = this.tableConfig.columns.map((col) => col.name);
    this.isClickable = !!this.onClicker;
  }

  doFilter = (value: string) => {
    this.tableConfig.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  clicker = (key) => {
    this.onClicker(key);
  };
}
