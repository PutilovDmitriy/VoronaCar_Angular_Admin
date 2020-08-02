import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.svg',
  styleUrls: ['./circle.component.scss'],
})
export class CircleComponent implements OnInit {
  @Input() size = '64px';
  @Input() color = '#000000';
  constructor() {}

  ngOnInit(): void {}
}
