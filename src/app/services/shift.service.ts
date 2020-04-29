import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../env';

export interface Shift {
  _id: string;
  userId: string;
  shiftStart: Date;
  shiftTime: number;
  valueOil: number;
  wash: number;
  carsList: { number: string; value: string }[];
  isFinished: boolean;
}

@Injectable()
export class ShiftService {
  loading = false;
  deleting = false;
  shifts: Shift[] = [];

  constructor(private http: HttpClient) {}

  getShifts(id: string): Observable<Shift[]> {
    this.loading = true;
    return this.http.get<Shift[]>(`${URL_SERVER}/shift/list`, {
      headers: new HttpHeaders({
        userid: id,
      }),
    });
  }

  deleteShifts(userId: string, ids: string[]): Observable<Shift[]> {
    this.deleting = true;
    return this.http.delete<Shift[]>(`${URL_SERVER}/shift/delete`, {
      headers: new HttpHeaders({
        userId: userId,
        ids: ids,
      }),
    });
  }
}
