import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
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
        ],
      },
    ]),
  ],
})
export class UsersPageModule {}
