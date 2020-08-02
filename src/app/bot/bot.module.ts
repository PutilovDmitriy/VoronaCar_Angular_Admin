import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingsModule } from '../loadings/loadings.module';
import { BotComponent } from './bot.component';

@NgModule({
  declarations: [BotComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LoadingsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BotComponent,
        canActivate: [AuthGuard],
      },
    ]),
    ReactiveFormsModule,
  ],
})
export class BotModule {}
