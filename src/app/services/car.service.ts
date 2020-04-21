import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url = 'https://pacific-cliffs-72324.herokuapp.com';
  constructor(private http: HttpClient) {}
}
