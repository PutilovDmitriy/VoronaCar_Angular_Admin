import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { ShiftService } from '../../services/shift.service';
import { Subscription } from 'rxjs';
import {
  animate,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

type NameInput = 'login' | 'name' | 'password';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ShiftService],
  animations: [
    trigger('input2', [
      state(
        'off',
        style({
          background: '#f5f5f5',
          border: '1px solid #f5f5f5',
          right: '112px',
        })
      ),
      state('on', style({ right: '0' })),
    ]),
    trigger('input1', [
      state(
        'off',
        style({
          background: '#f5f5f5',
          border: '1px solid #f5f5f5',
          left: '112px',
        })
      ),
      state('on', style({ left: '0' })),
    ]),
    trigger('label', [
      state(
        'off',
        style({
          background: 'blueviolet',
          cursor: 'pointer',
          color: '#fff',
        })
      ),
      state('on', style({ background: '#fff', color: '#000' })),
    ]),
    trigger('passwordBlock', [
      state('off', style({ background: '#f5f5f5' })),
      state('on', style({ background: '#fff' })),
      transition('off <=> on', [
        group([
          query(
            'input',
            animate(
              500,
              style({
                left: 0,
                right: 0,
                border: '1px solid #ccc',
                background: '#fff',
              })
            )
          ),
          query(
            'label',
            animate(
              500,
              style({
                background: '#fff',
                color: '#000',
              })
            )
          ),
          animate(500),
        ]),
      ]),
    ]),
  ],
})
export class UserComponent implements OnInit {
  editPassword = 'off';
  user: User;
  sub: Subscription;
  carListIdx: number | null = null;
  namesEditInput: string[] = [];
  login = '';
  name = '';
  password1 = null;
  password2 = null;
  invalidPassword = false;
  invalidLogin = false;

  constructor(
    private userService: UserService,
    public shiftService: ShiftService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.sub = this.userService.getById(params.id).subscribe((user) => {
        if (user) {
          this.user = user;
          this.login = user.login;
          this.name = user.name;
          this.sub.unsubscribe();
        }
      });
      this.shiftService.getShifts(params.id).subscribe((shifts) => {
        this.shiftService.shifts = shifts;
        this.shiftService.loading = false;
      });
    });
  }

  sumData(key: string): number {
    let sumTime = 0;
    this.shiftService.shifts.map((e) => {
      sumTime += e[key];
    });
    return sumTime;
  }

  changeVisibleCarList(idx: number) {
    if (this.carListIdx == null) {
      this.carListIdx = idx;
    } else if (this.carListIdx !== null) {
      if (this.carListIdx === idx) {
        this.carListIdx = null;
      } else {
        this.carListIdx = idx;
      }
    }
  }

  validPasswords() {
    if (
      this.password1.trim() &&
      this.password2.trim() &&
      this.password1 !== this.password2
    ) {
      return false;
    }
    return true;
  }

  submit(data: User) {
    this.userService.updating = true;
    this.userService.updateUser(data).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.userService.updating = false;
      }
    );
  }

  openInput(nameInput: NameInput) {
    this.namesEditInput.push(nameInput);
  }

  closeInput(nameInput: NameInput) {
    this.namesEditInput = this.namesEditInput.filter(
      (name) => name !== nameInput
    );
    switch (nameInput) {
      case 'login':
        this.login = this.user.login;
        break;
      case 'name':
        this.name = this.user.name;
        break;
      case 'password':
        this.password1 = this.password2 = null;
        break;
    }
  }

  saveInput(nameInput: NameInput) {
    switch (nameInput) {
      case 'login':
        if (isNaN(Number(this.login))) {
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          this.submit({ _id: this.user._id, login: this.login });
          this.closeInput(nameInput);
        }
        break;
      case 'name':
        this.submit({ _id: this.user._id, name: this.name });
        this.closeInput(nameInput);
        break;
      case 'password':
        if (nameInput !== 'password') {
        } else if (this.validPasswords()) {
          this.submit({ _id: this.user._id, password: this.password1 });
          this.closeInput(nameInput);
          this.editPassword = 'off';
          this.invalidPassword = false;
        } else {
          this.invalidPassword = true;
        }
        break;
    }
  }

  deleteUser() {
    this.userService.deleting = true;
    this.userService.deleteUser(this.user._id).subscribe(
      () => {
        this.userService.deleteUserFromState(this.user._id);
        this.router.navigate(['/users']);
      },
      () => {
        console.log('Ошибка удаления');
      },
      () => {
        this.userService.deleting = false;
      }
    );
  }
}
