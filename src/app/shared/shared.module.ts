import { NgModule } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { TablePipe } from './table.pipe';

@NgModule({
  declarations: [LoginComponent, TableComponent, TablePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FlexLayoutModule,
  ],
  providers: [DecimalPipe, UpperCasePipe, DatePipe],
  exports: [LoginComponent, TableComponent],
})
export class SharedModule {}
