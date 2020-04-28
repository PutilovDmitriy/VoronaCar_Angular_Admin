import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MyValidators } from '../../my.validators';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    public userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      login: new FormControl('', [
        Validators.minLength(11),
        Validators.required,
        MyValidators.number,
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  submit() {
    this.userService.userRegister(this.form.value).subscribe(
      (user) => {
        this.userService.addUserToState(user);
        this.notificationService.text = 'Пользователь создан!';
        this.notificationService.showBox = 'on';
        this.form.reset();
      },
      (error) => {
        this.notificationService.text = error.error.message;
        this.notificationService.showBox = 'on';
        this.userService.registering = false;
        this.notificationService.offShow();
      },
      () => {
        this.userService.registering = false;
        this.notificationService.offShow();
      }
    );
  }
}
