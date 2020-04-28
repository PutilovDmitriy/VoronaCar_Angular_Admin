import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  error: string;
  searchNumber: string;

  constructor(public carService: CarService) {}

  ngOnInit(): void {
    console.log('загружаю данные');
    this.carService.getCars().subscribe(
      (cars) => {
        this.carService.cars = cars;
      },
      (error) => {
        this.error = error.error.message;
        this.carService.loading = false;
      },
      () => {
        this.carService.loading = false;
      }
    );
  }

  updateSearch(text: string) {
    this.searchNumber = text;
  }
}
