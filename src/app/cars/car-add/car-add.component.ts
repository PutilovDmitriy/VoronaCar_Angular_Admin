import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../my.validators';
import { CarService } from '../../services/car.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss'],
})
export class CarAddComponent implements OnInit {
  form: FormGroup;
  error: any;

  constructor(
    public carService: CarService,
    private notificationService: NotificationService
  ) {}

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
        this.notificationService.showInfo('Авто добавлено!');
        this.form.reset();
      },
      (error) => {
        this.error = error.error.message;
        this.notificationService.showError(error.error.message);
        this.carService.loading = false;
      }
    );
  }
}
