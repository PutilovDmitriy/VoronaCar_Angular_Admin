import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-free-dots',
  templateUrl: './free-dots.component.svg',
  styleUrls: ['./free-dots.component.scss'],
})
export class FreeDotsComponent implements OnInit {
  @Input() width = '150px';
  @Input() height = '40px';
  @Input() background = '#ffffff';
  @Input() fill = '#000000';

  constructor() {}

  ngOnInit(): void {}
}
