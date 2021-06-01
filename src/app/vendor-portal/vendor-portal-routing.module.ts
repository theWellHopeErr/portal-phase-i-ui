import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FincancialSheetComponent } from './fincancial-sheet/fincancial-sheet.component';
import { PaymentsAgingComponent } from './payments-aging/payments-aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { QuotationComponent } from './quotation/quotation.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: 'vendor',
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
        path: 'quotation',
        component: QuotationComponent,
      },
      {
        path: 'purchase-order',
        component:PurchaseOrderComponent,
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPortalRoutingModule {}
