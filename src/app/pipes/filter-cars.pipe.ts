import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../services/car.service';

@Pipe({
  name: 'filterCars',
})
export class FilterCarsPipe implements PipeTransform {
  transform(value: Car[], text: string = ''): Car[] {
    if (text.trim()) {
      return value.filter((car) => {
        return car.number.toLowerCase().includes(text.toLowerCase());
      });
    }
    return value;
  }
}
