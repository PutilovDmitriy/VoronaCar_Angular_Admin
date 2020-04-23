import { NgModule } from '@angular/core';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';

@NgModule({
  declarations: [CarComponent, CarsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          {
            path: ':number',
            component: CarComponent,
          },
        ],
      },
    ]),
  ],
})
export class CarsModule {}
