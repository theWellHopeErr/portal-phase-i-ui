import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerPortalRoutingModule } from './customer-portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [CustomerPortalLandingComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, CustomerPortalRoutingModule],
  exports: [CustomerPortalLandingComponent],
})
export class CustomerPortalModule {}
