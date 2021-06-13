import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FinancialSheetComponent } from './financial-sheet/financial-sheet.component';
import { PaymentsAgingComponent } from './payments-aging/payments-aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { QuotationComponent } from './quotation/quotation.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';

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
        path: 'quotation-details/:pd',
        component: QuotationDetailsComponent,
      },
      {
        path: 'purchase-order',
        component: PurchaseOrderComponent,
      },
      {
        path: 'po-details/:pd',
        component: PurchaseOrderDetailsComponent,
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
      },
      {
        path: 'receipt-details',
        component: ReceiptDetailsComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPortalRoutingModule {}
