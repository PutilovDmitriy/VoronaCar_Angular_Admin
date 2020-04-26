import { NgModule } from '@angular/core';
import { DecodeLogoPipe } from '../pipes/decode-logo.pipe';
import { FilterCarsPipe } from '../pipes/filter-cars.pipe';
import { FilterUsersPipe } from '../pipes/filter-users.pipe';
import { TopBlockComponent } from '../top-block/top-block.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConvertTimePipe } from '../pipes/convert-time.pipe';

@NgModule({
  imports: [FormsModule, RouterModule],
  declarations: [
    DecodeLogoPipe,
    FilterCarsPipe,
    FilterUsersPipe,
    ConvertTimePipe,
    TopBlockComponent,
  ],
  exports: [
    DecodeLogoPipe,
    FilterCarsPipe,
    FilterUsersPipe,
    ConvertTimePipe,
    TopBlockComponent,
  ],
})
export class SharedModule {}
