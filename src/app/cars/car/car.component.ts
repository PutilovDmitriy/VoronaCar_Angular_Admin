import { Component, OnInit } from '@angular/core';
import { Car, CarService, Info } from '../../services/car.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  car: Car;
  sub: Subscription;
  edit = false;
  STS = '';
  OSAGO = '';
  dateOSAGO: Date | string = '';
  deleteMode = false;
  comments = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.sub = this.carService.getByNumber(params.number).subscribe((car) => {
        if (car) {
          this.car = car;
          this.sub.unsubscribe();
          this.STS = this.car?.info?.STS;
          this.OSAGO = this.car?.info?.OSAGO;
          this.dateOSAGO = String(this.car?.info?.dateOSAGO).slice(0, 10);
          this.comments = this.car.comments;
        }
      });
    });
  }

  save() {
    const data: Info = {
      STS: this.STS,
      OSAGO: this.OSAGO,
      dateOSAGO: new Date(this.dateOSAGO),
    };
    this.carService.updateCar(this.car.number, this.comments, data).subscribe(
      (car) => {
        this.car = car;
        this.carService.updating = false;
        this.notificationService.showInfo('Информация обновлена!');
        this.edit = false;
      },
      (error) => {
        this.notificationService.showError(error.error.message);
        this.carService.updating = false;
      }
    );
  }

  delete() {
    this.carService.deleteCar(this.car.number).subscribe(
      (res) => {
        this.notificationService.showInfo('Автомобиль удален!');
        this.carService.deleteByNumber(this.car.number);
        this.router.navigate(['/cars']);
        this.carService.deleting = false;
        this.deleteMode = false;
      },
      (error) => {
        this.edit = false;
        this.notificationService.showError(error.error.message);
        this.carService.deleting = false;
        this.deleteMode = false;
      }
    );
  }

  closeEdit() {
    this.STS = this.car?.info?.STS;
    this.OSAGO = this.car?.info?.OSAGO;
    this.dateOSAGO = this.car?.info?.dateOSAGO;
    this.edit = false;
    this.comments = this.car?.comments;
  }
}
