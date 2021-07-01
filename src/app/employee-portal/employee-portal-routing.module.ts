import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaveComponent } from './leave/leave.component';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { PaySlipDetailsComponent } from './pay-slip-details/pay-slip-details.component';
import { NoticeComponent } from './notice/notice.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

const routes: Routes = [
  {
    path: 'employee',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'leave',
        component: LeaveComponent,
      },
      {
        path: 'leave-request',
        component: LeaveRequestComponent,
      },
      {
        path: 'pay-slip',
        component: PaySlipComponent,
      },
      {
        path: 'pay-slip/:sn',
        component: PaySlipDetailsComponent,
      },
      {
        path: 'notice',
        component: NoticeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePortalRoutingModule {}
