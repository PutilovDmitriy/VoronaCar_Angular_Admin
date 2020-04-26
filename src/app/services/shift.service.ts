import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../env';

export interface Shift {
  userId: string;
  shiftStart: Date;
  shiftTime: number;
  valueOil: number;
  wash: number;
  carsList: string[];
  isFinished: boolean;
}

@Injectable()
export class ShiftService {
  loading = false;
  shifts: Shift[];

  constructor(private http: HttpClient) {}

  getShifts(id: string): Observable<Shift[]> {
    this.loading = true;
    return this.http.get<Shift[]>(`${URL_SERVER}/shift/list`, {
      headers: new HttpHeaders({
        userid: id,
      }),
    });
  }
}
