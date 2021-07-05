import {Component} from '@angular/core';
import {CarService} from '../services/car.service';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  startDate: string;
  endDate: string;
  number: string;

  constructor(private carService: CarService) {
  }

  saveFile(name: string, type: string, data: any) {
    if (data !== null && navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], { type }), name);
    }

    const a = document.createElement('a');
    a.style.display = 'none';
    const url = window.URL.createObjectURL(new Blob([data], { type }));
    a.setAttribute('href', url);
    a.setAttribute('download', name);
    document.body.append(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  download() {
    this.carService.getServiceRecord(this.startDate, this.endDate, this.number).subscribe((res) => {
      this.saveFile('Отчет.xlsx', res.type, res);
    });
  }
}
