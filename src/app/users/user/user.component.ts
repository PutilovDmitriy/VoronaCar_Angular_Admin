import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(
    private userService: UserService,
    public shiftService: ShiftService,
    private route: ActivatedRoute
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
      console.log('No password');
    }
  }

  submit() {
    this.userService.updating = true;
    const data: User = {
      _id: this.user._id,
      name: this.name,
      login: this.login,
    };
    console.log(this.password1);
    if (this.password1 !== null && this.password1 === this.password2) {
      data.password = this.password1;
    }
    console.log(data);
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
    if (nameInput === 'password') {
      this.password1 = this.password2 = null;
    }
  }

  saveInput(nameInput: NameInput) {
    this.submit();
    this.closeInput(nameInput);
  }
}
