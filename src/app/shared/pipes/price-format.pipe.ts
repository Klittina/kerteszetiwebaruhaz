import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';

    const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} Ft`;
  }
}
