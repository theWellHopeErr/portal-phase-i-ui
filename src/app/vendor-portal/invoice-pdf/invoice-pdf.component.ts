import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { FiService } from 'src/app/vendor-portal/services/fi.service';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.css'],
})
export class InvoicePdfComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private fiService: FiService,
    private route: ActivatedRoute,
    private dom: DomSanitizer
  ) {
    this.titleService.setTitle('Invoice List | Vendor Portal');
  }

  loading = true;
  error = '';
  inv = '';
  fisc = '';
  pdfurl = this.dom.bypassSecurityTrustResourceUrl('');

  ngOnInit(): void {
    this.inv = this.route.url['value'][1].path;
    this.fisc = this.route.url['value'][2].path;
    this.fiService.getInvoicePDF(this.inv, this.fisc).subscribe(
      (res: any) => {
        let encodedPdfContent = res.pdf;
        this.loading = false;
        let decodedPdfContent = atob(encodedPdfContent);
        let byteArray = new Uint8Array(decodedPdfContent.length);
        for (let i = 0; i < decodedPdfContent.length; i++) {
          byteArray[i] = decodedPdfContent.charCodeAt(i);
        }
        let blob = new Blob([byteArray.buffer], {
          type: 'application/pdf',
        });
        this.pdfurl = this.dom.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(blob)
        );
      },
      (err) => {
        if (err.includes('404'))
          this.error = `No Invoice Record found for Invoice Number: ${this.inv}`;
        else this.error = 'Internal Server Error';
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
