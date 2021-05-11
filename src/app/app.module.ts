import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CustomerPortalComponent } from './customer-portal/customer-portal.component';
import { VendorPortalComponent } from './vendor-portal/vendor-portal.component';
import { EmployeePortalComponent } from './employee-portal/employee-portal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerPortalComponent,
    VendorPortalComponent,
    EmployeePortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
