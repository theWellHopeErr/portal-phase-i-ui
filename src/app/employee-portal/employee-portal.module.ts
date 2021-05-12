import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeePortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeePortalRoutingModule } from './employee-portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [EmployeePortalLandingComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, EmployeePortalRoutingModule],
})
export class EmployeePortalModule {}
