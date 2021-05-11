import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CustomerPortalLandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      { path: '', component: CustomerPortalLandingComponent },
      { path: 'login', component: AuthComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPortalRoutingModule {}
