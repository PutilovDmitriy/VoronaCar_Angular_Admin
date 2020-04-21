import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginGuard } from './services/login.guard';
import { CarsComponent } from './cars/cars.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'cars', component: CarsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
