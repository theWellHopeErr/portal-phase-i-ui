import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPortalComponent } from './customer-portal/customer-portal.component';
import { EmployeePortalComponent } from './employee-portal/employee-portal.component';
import { HomeComponent } from './home/home.component';
import { VendorPortalComponent } from './vendor-portal/vendor-portal.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer', component: CustomerPortalComponent },
  { path: 'vendor', component: VendorPortalComponent },
  { path: 'employee', component: EmployeePortalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
