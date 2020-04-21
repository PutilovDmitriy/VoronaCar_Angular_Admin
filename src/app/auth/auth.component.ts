import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../my.validators';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
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
    this.userService.userAutorise(this.form.value).subscribe(
      (user) => {
        this.userService.admin = {
          userId: user.userId,
          login: user.login,
          name: user.name,
        };
        this.userService.loading = false;
        this.userService.isAuth = true;
        localStorage.setItem('TOKEN', user.token);
        this.router.navigate(['/cars']);
      },
      (error) => (this.error = error.error.message)
    );
  }
}
