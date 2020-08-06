import { FormControl } from '@angular/forms';

export class MyValidators {
  static numberAuto(control: FormControl): { [key: string]: boolean } {
    const reg = /^[АВЕКМНОРСТУХABEKMHOPCTYX]\d{3}(?<!000)[АВЕКМНОРСТУХABEKMHOPCTYX]{2}/;
    if (!reg.test(control.value?.toUpperCase())) {
      return { reg: true };
    }
    return null;
  }
}
