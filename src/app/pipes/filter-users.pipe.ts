import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../services/user.service';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(value: User[], text: string = ''): User[] {
    if (text.trim()) {
      return value.filter((user) => {
        return user.name.toLowerCase().includes(text.toLowerCase());
      });
    }
    return value;
  }
}
