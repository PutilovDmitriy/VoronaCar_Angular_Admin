import { NgModule } from '@angular/core';
import { DecodeLogoPipe } from '../pipes/decode-logo.pipe';
import { FilterCarsPipe } from '../pipes/filter-cars.pipe';
import { FilterUsersPipe } from '../pipes/filter-users.pipe';
import { TopBlockComponent } from '../top-block/top-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConvertTimePipe } from '../pipes/convert-time.pipe';
import { NotificationComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [FormsModule, RouterModule, CommonModule],
  declarations: [
    DecodeLogoPipe,
    FilterCarsPipe,
    FilterUsersPipe,
    ConvertTimePipe,
    TopBlockComponent,
    NotificationComponent,
  ],
  exports: [
    DecodeLogoPipe,
    FilterCarsPipe,
    FilterUsersPipe,
    ConvertTimePipe,
    TopBlockComponent,
    NotificationComponent,
  ],
})
export class SharedModule {}
