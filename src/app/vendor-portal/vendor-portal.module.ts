import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { VendorPortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { VendorPortalRoutingModule } from './vendor-portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FincancialSheetComponent } from './fincancial-sheet/fincancial-sheet.component';
import { PaymentsAgingComponent } from './payments-aging/payments-aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { QuotationComponent } from './quotation/quotation.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    VendorPortalLandingComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    FincancialSheetComponent,
    PaymentsAgingComponent,
    CdMemoComponent,
    ReceiptComponent,
    PurchaseOrderComponent,
    QuotationComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VendorPortalRoutingModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
  ],
})
export class VendorPortalModule {}
