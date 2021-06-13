import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiService {
  constructor(private http: HttpClient) {}

  getCreditMemo() {
    return this.http.get(`api/vendor/credit`);
  }

  getDebitMemo() {
    return this.http.get(`api/vendor/debit`);
  }

  getPaymentsAging() {
    return this.http.get(`api/vendor/pa`);
  }

  getInvoicList() {
    return this.http.get(`api/vendor/invoice`);
  }

  getInvoicePDF(invoice_no: string, fiscal_year: string) {
    return this.http.get(
      `api/vendor/invoice-pdf?inv_no=${invoice_no}&year=${fiscal_year}`
    );
  }
}
