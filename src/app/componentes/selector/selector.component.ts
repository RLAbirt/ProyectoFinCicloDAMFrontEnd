import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {

  @Output() valueSelected:EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  ngOnInit() {}

  public segmentChanged(event: Event){
    this.valueSelected.emit(event);
    console.log(this.valueSelected);
  }
}
