import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PO } from '../purchase-order/PO';

@Injectable({
  providedIn: 'root',
})
export class MmService {
  constructor(private http: HttpClient) {}

  getRFQList() {
    return this.http.get(`api/vendor/rfq`);
  }

  getRFQDetails(pd: string) {
    return this.http.get(`api/vendor/rfq-details?pd=${pd}`);
  }

  getPOList() {
    return this.http.get(`api/vendor/po`);
  }

  getPODetails(pd: string) {
    return this.http.get(`api/vendor/po-details?pd=${pd}`);
  }

  createPO(POData: PO) {
    return this.http.post('api/vendor/po-create', POData);
  }

  getGRList() {
    return this.http.get(`api/vendor/gr`);
  }

  getGRDetails(material_document: string, material_year: string) {
    return this.http.get(
      `api/vendor/gr-details?md=${material_document}&my=${material_year}`
    );
  }
}
