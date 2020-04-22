import { Component, OnInit } from '@angular/core';
import { User, UserService } from './services/user.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  token: string;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('TOKEN');
    if (this.token) {
      const info: User = jwt_decode(this.token);
      this.userService.isAuth = true;
    }
  }
}
