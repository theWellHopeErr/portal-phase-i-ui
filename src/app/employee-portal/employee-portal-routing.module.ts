import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EmployeePortalLandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      { path: '', component: EmployeePortalLandingComponent },
      { path: 'login', component: AuthComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePortalRoutingModule {}
