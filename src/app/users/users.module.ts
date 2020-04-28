import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFreeComponent } from './user-free/user-free.component';
import { UserAddComponent } from './user-add/user-add.component';
import { LoadingsModule } from '../loadings/loadings.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserFreeComponent,
    UserAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LoadingsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          { path: 'add', component: UserAddComponent },
          {
            path: ':id',
            component: UserComponent,
          },
          { path: '', component: UserFreeComponent },
        ],
      },
    ]),
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
