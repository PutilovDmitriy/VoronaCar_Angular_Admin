import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../my.validators';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss'],
})
export class CarAddComponent implements OnInit {
  form: FormGroup;
  error: any;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      number: new FormControl('', [MyValidators.numberAuto]),
      model: new FormControl('R'),
      info: new FormGroup({
        VIN: new FormControl(''),
        STS: new FormControl(''),
        OSAGO: new FormControl(''),
        dateOSAGO: new FormControl(''),
        code: new FormControl(''),
        tel: new FormControl(''),
        IMEI: new FormControl(''),
      }),
    });
  }

  submit() {
    this.carService.addCar(this.form.value).subscribe(
      (car) => {
        this.carService.loading = false;
        this.carService.addCarState(car);
        this.form.reset();
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
}
