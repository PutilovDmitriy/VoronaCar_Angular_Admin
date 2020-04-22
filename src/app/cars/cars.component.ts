import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  error: string;
  searchNumber: string;

  constructor(public carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      (cars) => {
        this.carService.cars = cars;
      },
      (error) => (this.error = error.error.message),
      () => {
        this.carService.loading = false;
      }
    );
  }

  focusSearch() {
    this.searchInput.nativeElement.focus();
  }
}
