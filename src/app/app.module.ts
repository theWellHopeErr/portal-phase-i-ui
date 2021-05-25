import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerPortalModule } from './customer-portal/customer-portal.module';
import { VendorPortalModule } from './vendor-portal/vendor-portal.module';
import { EmployeePortalModule } from './employee-portal/employee-portal.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { PhaseOneComponent } from './phase-one/phase-one.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PhaseOneComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomerPortalModule,
    VendorPortalModule,
    EmployeePortalModule,
    SharedModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
