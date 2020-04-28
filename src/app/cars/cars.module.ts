import { NgModule } from '@angular/core';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { CarAddComponent } from './car-add/car-add.component';
import { CarFreeComponent } from './car-free/car-free.component';
import { LoadingsModule } from '../loadings/loadings.module';

@NgModule({
  declarations: [
    CarComponent,
    CarsComponent,
    CarAddComponent,
    CarFreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LoadingsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'add',
            component: CarAddComponent,
          },
          {
            path: ':number',
            component: CarComponent,
          },
          { path: '', component: CarFreeComponent },
        ],
      },
    ]),
    ReactiveFormsModule,
  ],
})
export class CarsModule {}
