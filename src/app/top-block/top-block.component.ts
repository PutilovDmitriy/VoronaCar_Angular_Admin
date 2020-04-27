import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.scss'],
})
export class TopBlockComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @Input() link: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  error: string;
  searchText: string;

  constructor() {}

  ngOnInit() {}
  focusSearch() {
    this.searchInput.nativeElement.focus();
  }

  changeText() {
    this.onChange.emit(this.searchText);
  }
}
