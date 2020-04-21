import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  userId?: string;
  login: string;
  password?: string;
  name?: string;
}

export interface LoginUser extends User {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loading = false;
  isAuth = false;
  admin: User | null = null;
  users: User[] = [];
  url = 'https://pacific-cliffs-72324.herokuapp.com';

  constructor(private http: HttpClient) {}

  userAutorise(loginInfo: User): Observable<LoginUser> {
    this.loading = true;
    return this.http.post<LoginUser>(`${this.url}/auth/login`, loginInfo);
  }

  userRegister(userInfo: User): Observable<User> {
    this.loading = true;
    return this.http.post<User>(`${this.url}/auth/register`, userInfo);
  }
}
