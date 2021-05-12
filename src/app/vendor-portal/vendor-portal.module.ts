import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { VendorPortalRoutingModule } from './vendor-portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [VendorPortalLandingComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, VendorPortalRoutingModule],
})
export class VendorPortalModule {}
