import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime',
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return null;
    }
    let m = value % 60;
    let h = (value - m) / 60;
    return `${h} ч. ${Math.round(m)} мин`;
  }
}
