import { NgModule } from '@angular/core';
import { DecodeLogoPipe } from '../pipes/decode-logo.pipe';
import { FilterCarsPipe } from '../pipes/filter-cars.pipe';
import { FilterUsersPipe } from '../pipes/filter-users.pipe';

@NgModule({
  declarations: [DecodeLogoPipe, FilterCarsPipe, FilterUsersPipe],
  exports: [DecodeLogoPipe, FilterCarsPipe, FilterUsersPipe],
})
export class SharedModule {}
