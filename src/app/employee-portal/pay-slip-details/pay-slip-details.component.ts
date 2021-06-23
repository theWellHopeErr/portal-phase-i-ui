import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HcmService } from '../services/hcm.service';

@Component({
  selector: 'app-pay-slip-details',
  templateUrl: './pay-slip-details.component.html',
  styleUrls: ['./pay-slip-details.component.css'],
})
export class PaySlipDetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private location: Location,
    private hcmService: HcmService,
    private route: ActivatedRoute,
    private dom: DomSanitizer
  ) {
    this.titleService.setTitle(`Pay Slip PDF | Employee Portal`);
    this.route.params.subscribe((params) => (this.sn = params.sn));
  }

  tableConfig = {
    columns: [
      { name: 'PO_ITEM', title: 'Item Number', pipe: 'number' },
      { name: 'CHANGED_ON', title: 'Changed On', pipe: 'date' },
      { name: 'SHORT_TEXT', title: 'Description', pipe: 'string' },
      { name: 'NET_PRICE', title: 'Net price', pipe: 'currency' },
      { name: 'CO_CODE', title: 'Company Code', pipe: 'string' },
      { name: 'PLANT', title: 'Plant', pipe: 'uppercase' },
      { name: 'MATERIAL', title: 'Material', pipe: 'uppercase' },
      { name: 'STATUS', title: 'Status', pipe: 'uppercase' },
    ],
  };
  loading = true;
  error = '';
  sn: string;
  pdfurl = this.dom.bypassSecurityTrustResourceUrl('');

  ngOnInit(): void {
    this.hcmService.getPaySlipDetails(this.sn).subscribe(
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
      (_err) => {
        this.error = `No Record found for the Sequence Number: ${this.sn}`;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
