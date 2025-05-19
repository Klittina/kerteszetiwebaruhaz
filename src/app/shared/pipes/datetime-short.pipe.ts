import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeShort'
})
export class DatetimeShortPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return '';

    const date = new Date(value);

    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());

    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  private padZero(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
