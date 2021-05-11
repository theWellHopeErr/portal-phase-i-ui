import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CustomerPortalLandingComponent } from './customer-portal/landing/landing.component';
import { VendorPortalLandingComponent } from './vendor-portal/landing/landing.component';
import { EmployeePortalLandingComponent } from './employee-portal/landing/landing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer', component: CustomerPortalLandingComponent },
  { path: 'vendor', component: VendorPortalLandingComponent },
  { path: 'employee', component: EmployeePortalLandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
