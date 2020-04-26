import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVER } from '../../env';
import { Observable } from 'rxjs';

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
  dateOSAGO?: Date;
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

  cars: Car[] = [];

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    this.loading = true;
    return this.http.get<Car[]>(`${URL_SERVER}/car/info`);
  }

  getByNumber(number: string): Car {
    return this.cars.find((car) => car.number === number);
  }

  addCar(car: Car): Observable<Car> {
    this.loading = true;
    return this.http.post<Car>(`${URL_SERVER}/car/create`, car);
  }

  addCarState(car: Car) {
    this.cars.push(car);
  }

  updateCar(number: string, info: Info): Observable<Car> {
    this.loading = true;
    return this.http.put<Car>(`${URL_SERVER}/car/update`, {
      number,
      info,
    });
  }
}
