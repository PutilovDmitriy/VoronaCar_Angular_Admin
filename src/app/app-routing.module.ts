import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginGuard } from './services/login.guard';
import { CarsComponent } from './cars/cars.component';
import { UsersComponent } from './users/users.component';
import { CarComponent } from './cars/car/car.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  {
    path: 'cars',
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
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users-page.module').then((m) => m.UsersPageModule),
  },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
