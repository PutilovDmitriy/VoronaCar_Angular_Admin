import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  searchName: string;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.userService.users = users;
      },
      (error) => {
        console.log(error.error.message);
      },
      () => {
        this.userService.loading = false;
      }
    );
  }

  updateSearch(text: string) {
    this.searchName = text;
  }
}
