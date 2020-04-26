import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFreeComponent } from './user-free/user-free.component';

@NgModule({
  declarations: [UsersComponent, UserComponent, UserFreeComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          {
            path: ':id',
            component: UserComponent,
          },
          { path: '', component: UserFreeComponent },
        ],
      },
    ]),
  ],
})
export class UsersModule {}
