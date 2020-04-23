import { Pipe, PipeTransform } from '@angular/core';
import { Model } from '../services/car.service';
import { URLS_LOGO } from '../../env';

@Pipe({
  name: 'decodeLogo',
})
export class DecodeLogoPipe implements PipeTransform {
  transform(value: Model): string {
    if (!value.trim()) {
      return null;
    }
    return URLS_LOGO[value];
  }
}
