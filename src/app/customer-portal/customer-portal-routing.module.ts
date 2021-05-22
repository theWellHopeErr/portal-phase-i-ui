import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { LodComponent } from './lod/lod.component';
import { FincancialSheetComponent } from './fincancial-sheet/fincancial-sheet.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentsAgingComponent } from './payments-aging/payments-aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { OverallSalesComponent } from './overall-sales/overall-sales.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { InquiryDetailsComponent } from './inquiry-details/inquiry-details.component';

const routes: Routes = [
  {
    path: 'customer',
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
        path: 'inquiry',
        component: InquiryComponent,
      },
      {
        path: 'inquiry-details/:sd',
        component: InquiryDetailsComponent,
      },
      {
        path: 'sales-order',
        component: SalesOrderComponent,
      },
      {
        path: 'lod',
        component: LodComponent,
      },

      {
        path: 'fincancial-sheet',
        component: FincancialSheetComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'payments-aging',
        component: PaymentsAgingComponent,
      },
      {
        path: 'cd-memo',
        component: CdMemoComponent,
      },
      {
        path: 'overall-sales',
        component: OverallSalesComponent,
      },
      {
        path: 'customer-master',
        component: CustomerMasterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPortalRoutingModule {}
