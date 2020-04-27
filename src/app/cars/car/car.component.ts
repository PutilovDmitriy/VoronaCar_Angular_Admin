import { Component, OnInit } from '@angular/core';
import { Car, CarService, Info } from '../../services/car.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
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
        }
      });
    });
  }

  // updateCar() {
  //   this.carService
  //     .updateCar()
  //     .subscribe((car) => {});
  // }
  save() {
    const data: Info = {
      STS: this.STS,
      OSAGO: this.OSAGO,
      dateOSAGO: new Date(this.dateOSAGO),
    };
    this.carService.updateCar(this.car.number, data).subscribe(
      (car) => {
        this.car = car;
      },
      (error) => {
        console.log(error.error.message);
      },
      () => {
        this.carService.updating = false;
      }
    );
  }

  delete() {
    this.carService.deleteCar(this.car.number).subscribe(
      (res) => {
        this.router.navigate(['/cars']);
      },
      (error) => {
        console.log(error.error.message);
      },
      () => {
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
  }
}
