import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../env';

export interface User {
  _id?: string;
  login: string;
  password?: string;
  name?: string;
}

export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loading = false;
  isAuth = false;
  users: User[] = [];

  constructor(private http: HttpClient) {}

  userAutorise(loginInfo: User): Observable<Token> {
    this.loading = true;
    return this.http.post<Token>(`${URL_SERVER}/auth/login/admin`, loginInfo);
  }

  userRegister(userInfo: User): Observable<User> {
    this.loading = true;
    return this.http.post<User>(`${URL_SERVER}/auth/register`, userInfo);
  }

  getUsers(): Observable<User[]> {
    this.loading = true;
    const token = localStorage.getItem('TOKEN');
    return this.http.get<User[]>(`${URL_SERVER}/user/list`, {
      headers: new HttpHeaders({
        token,
      }),
    });
  }

  getById(id: string): User {
    return this.users.find((user) => user._id === id);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${URL_SERVER}/user/${id}`);
  }

  deleteUserFromState(id: string) {
    this.users = this.users.filter((user) => user._id !== id);
  }
}
