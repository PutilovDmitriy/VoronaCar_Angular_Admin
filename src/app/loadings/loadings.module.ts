import { NgModule } from '@angular/core';
import { FreeDotsComponent } from './free-dots/free-dots.component';
import { CircleComponent } from './circle/circle.component';

@NgModule({
  imports: [],
  declarations: [FreeDotsComponent, CircleComponent],
  exports: [FreeDotsComponent, CircleComponent],
})
export class LoadingsModule {}
