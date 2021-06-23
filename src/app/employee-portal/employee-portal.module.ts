import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EmployeePortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeePortalRoutingModule } from './employee-portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaveComponent } from './leave/leave.component';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { PaySlipDetailsComponent } from './pay-slip-details/pay-slip-details.component';
import { NoticeComponent } from './notice/notice.component';

@NgModule({
  declarations: [
    EmployeePortalLandingComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    LeaveComponent,
    PaySlipComponent,
    PaySlipDetailsComponent,
    NoticeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeePortalRoutingModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class EmployeePortalModule {}
