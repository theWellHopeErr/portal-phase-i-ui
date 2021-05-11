import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerPortalRoutingModule } from './customer-portal-routing.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [CustomerPortalLandingComponent, AuthComponent],
  imports: [CommonModule, SharedModule, CustomerPortalRoutingModule],
  exports: [CustomerPortalLandingComponent],
})
export class CustomerPortalModule {}
