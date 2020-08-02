import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  text = '';
  colorError = false;
  showBox: 'on' | 'off' = 'off';

  constructor() {}

  offShow = () => {
    setTimeout(() => {
      this.showBox = 'off';
      this.colorError = false;
    }, 2500);
  };

  showInfo(text: string) {
    this.text = text;
    this.showBox = 'on';
    this.offShow();
  }

  showError(text: string) {
    this.text = text;
    this.colorError = true;
    this.showBox = 'on';
    this.offShow();
  }
}
