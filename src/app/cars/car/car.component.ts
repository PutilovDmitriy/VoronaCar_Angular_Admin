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
  problems: Array<ProblemItem> = [];
  newProblem = '';

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
          this.problems = this.getProblemsItem(this.car?.problems);
        }
      });
    });
  }

  getProblemsItem(problems: string[] | undefined): Array<ProblemItem> {
    if (!problems) {
      return [];
    }
    return problems.map((p) => {
      return { text: p, checked: false };
    });
  }

  save() {
    const data: Info = {
      STS: this.STS,
      OSAGO: this.OSAGO,
      dateOSAGO: new Date(this.dateOSAGO),
    };
    const problems = this.problems.filter((p) => !p.checked).map((p) => p.text);
    this.carService.updateCar(this.car.number, problems, data).subscribe(
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
    this.problems = this.getProblemsItem(this.car?.problems);
  }

  addNewProblem() {
    if (this.newProblem) {
      this.problems.push({ text: this.newProblem, checked: false });
      this.newProblem = '';
      this.edit = true;
    }
  }

  checkProblem(problem: ProblemItem) {
    problem.checked = !problem.checked;
    if (!this.edit) {
      this.edit = true;
    }
  }
}

interface ProblemItem {
  text: string;
  checked: boolean;
}
