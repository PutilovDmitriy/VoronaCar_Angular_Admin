import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('box', [
      state('off', style({ visibility: 'hidden' })),
      state('on', style({ visibility: 'visible' })),
      transition('off => on', animate(200)),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {}
}
