import { Component, OnInit } from '@angular/core';
import { Car, CarService } from '../../services/car.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  info: Car;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.info = this.carService.getByNumber(params.number);
    });
  }
}
