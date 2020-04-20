import { FormControl } from '@angular/forms';

export class MyValidators {
  static number(control: FormControl): { [key: string]: boolean } {
    if (isNaN(Number(control.value))) {
      return { NaN: true };
    }
    return null;
  }
}
