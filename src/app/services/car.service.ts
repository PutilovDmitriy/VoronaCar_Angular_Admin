import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVER } from '../../env';
import { Observable, throwError } from 'rxjs';
import { User } from './user.service';
import { catchError } from 'rxjs/operators';

export interface Car {
  id?: string;
  number: string;
  model?: Model;
  lastService?: string;
  problems?: string[];
  isRepairing?: boolean;
  comments?: string;
  info?: Info;
}

export interface Info {
  VIN?: string;
  STS?: string;
  OSAGO?: string;
  dateOSAGO?: Date | string;
  code?: string;
  tel?: string;
  IMEI?: string;
}

// type Problem =

export type Model = 'R' | 'W' | 'K';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  loading = false;
  updating = false;
  deleting = false;

  cars: Car[] = [];

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    this.loading = true;
    return this.http.get<Car[]>(`${URL_SERVER}/car/info`);
  }

  getByNumber(number: string): Observable<Car> {
    return new Observable<Car>((observable) => {
      setInterval(() => {
        observable.next(this.cars.find((car) => car.number === number));
      }, 100);
    });
  }

  addCar(car: Car): Observable<Car> {
    this.loading = true;
    return this.http.post<Car>(`${URL_SERVER}/car/create`, car);
  }

  addCarState(car: Car) {
    this.cars.push(car);
  }

  updateCar(number: string, problems: string[], info: Info): Observable<Car> {
    this.updating = true;
    return this.http.put<Car>(`${URL_SERVER}/car/update`, {
      number,
      info,
      problems,
    });
  }

  deleteCar(number: string): Observable<any> {
    this.deleting = true;
    return this.http.delete<any>(`${URL_SERVER}/car/${number}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteByNumber(number: string) {
    this.cars = this.cars.filter((car) => car.number !== number);
  }
}
