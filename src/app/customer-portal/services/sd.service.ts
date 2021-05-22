import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SdService {
  constructor(private http: HttpClient) {}

  getInquiryList() {
    return this.http.get(`api/customer/inquiry`);
  }

  getInquiryDetails(sd: string) {
    return this.http.get(`api/customer/inquiry-details?sd=${sd}`);
  }

  getSaleOrderList() {
    return this.http.get(`api/customer/so`);
  }

  getSaleOrderDetails(sd: string) {
    return this.http.get(`api/customer/so-details?sd=${sd}`);
  }

  getDeliveryList() {
    return this.http.get(`api/customer/lod`);
  }

  getDeliveryDetails(sd: string) {
    return this.http.get(`api/customer/lod-details?sd=${sd}`);
  }
}
