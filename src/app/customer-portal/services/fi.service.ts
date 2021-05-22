import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiService {
  constructor(private http: HttpClient) {}

  getCreditMemo() {
    return this.http.get(`api/customer/credit`);
  }

  getDebitMemo() {
    return this.http.get(`api/customer/debit`);
  }

  getPaymentsAging() {
    return this.http.get(`api/customer/pa`);
  }
}
