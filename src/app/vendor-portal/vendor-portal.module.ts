import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPortalLandingComponent } from './landing/landing.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { VendorPortalRoutingModule } from './vendor-portal-routing.module';

@NgModule({
  declarations: [VendorPortalLandingComponent, AuthComponent],
  imports: [CommonModule, SharedModule, VendorPortalRoutingModule],
})
export class VendorPortalModule {}
