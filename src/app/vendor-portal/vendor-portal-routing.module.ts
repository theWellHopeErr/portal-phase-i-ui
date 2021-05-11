import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { VendorPortalLandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'vendor',
    children: [
      { path: '', component: VendorPortalLandingComponent },
      { path: 'login', component: AuthComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPortalRoutingModule {}
