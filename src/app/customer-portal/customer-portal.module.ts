import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

import { CustomerPortalLandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerPortalRoutingModule } from './customer-portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
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
import { SoDetailsComponent } from './so-details/so-details.component';
import { LodDetailsComponent } from './lod-details/lod-details.component';

@NgModule({
  declarations: [
    CustomerPortalLandingComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    InquiryComponent,
    SalesOrderComponent,
    LodComponent,
    FincancialSheetComponent,
    InvoiceComponent,
    PaymentsAgingComponent,
    CdMemoComponent,
    OverallSalesComponent,
    CustomerMasterComponent,
    InquiryDetailsComponent,
    SoDetailsComponent,
    LodDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerPortalRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FilePondModule,
  ],
  exports: [CustomerPortalLandingComponent],
})
export class CustomerPortalModule {}
