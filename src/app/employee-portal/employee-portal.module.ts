import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeePortalLandingComponent } from './landing/landing.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeePortalRoutingModule } from './employee-portal-routing.module';

@NgModule({
  declarations: [EmployeePortalLandingComponent, AuthComponent],
  imports: [CommonModule, SharedModule, EmployeePortalRoutingModule],
})
export class EmployeePortalModule {}
