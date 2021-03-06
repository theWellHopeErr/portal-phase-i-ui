import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { LodComponent } from './lod/lod.component';
import { FinancialSheetComponent } from './financial-sheet/financial-sheet.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentsAgingComponent } from './payments-aging/payments-aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { OverallSalesComponent } from './overall-sales/overall-sales.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { InquiryDetailsComponent } from './inquiry-details/inquiry-details.component';
import { SoDetailsComponent } from './so-details/so-details.component';
import { LodDetailsComponent } from './lod-details/lod-details.component';

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
        path: 'so-details/:sd',
        component: SoDetailsComponent,
      },
      {
        path: 'lod',
        component: LodComponent,
      },
      {
        path: 'lod-details/:sd',
        component: LodDetailsComponent,
      },

      {
        path: 'financial-sheet',
        component: FinancialSheetComponent,
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
        path: 'master-data',
        component: MasterDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPortalRoutingModule {}
