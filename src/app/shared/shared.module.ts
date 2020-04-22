import { NgModule } from '@angular/core';
import { DecodeLogoPipe } from '../pipes/decode-logo.pipe';
import { SortCarsPipe } from '../pipes/sort-cars.pipe';

@NgModule({
  declarations: [DecodeLogoPipe, SortCarsPipe],
  exports: [DecodeLogoPipe, SortCarsPipe],
})
export class SharedModule {}
