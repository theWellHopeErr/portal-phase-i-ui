import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'table',
})
export class TablePipe implements PipeTransform {
  constructor(
    private upperCasePipe: UpperCasePipe,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe
  ) {}
  transform(value: string, _t, obj) {
    switch (obj.pipe) {
      case 'number':
        return value ? parseInt(value) : '-';
      case 'date':
        return value ? this.datePipe.transform(value) : '-';
      case 'string':
        return value ? this.upperCasePipe.transform(value) : '-';
      case 'currency':
        return value ? this.decimalPipe.transform(value, '1.2-2') : '-';
      case 'k_usd':
        return value ? `$ ${value},000` : '-';
      default:
        return value;
    }
  }
}
