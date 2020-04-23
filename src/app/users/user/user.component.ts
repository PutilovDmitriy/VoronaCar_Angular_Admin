import { Component, OnInit } from '@angular/core';
import { Car, CarService } from '../../services/car.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  info: User;

  constructor(private userSrvice: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.info = this.userSrvice.getById(params.id);
    });
  }
}
