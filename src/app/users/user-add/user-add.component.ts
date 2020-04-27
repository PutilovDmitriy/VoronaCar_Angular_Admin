import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MyValidators } from '../../my.validators';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  form: FormGroup;
  error: any;

  constructor(private userService: UserService) {}

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
      (res) => {
        console.log(res.message);
      },
      (error) => (this.error = error.error.message)
    );
  }
}
