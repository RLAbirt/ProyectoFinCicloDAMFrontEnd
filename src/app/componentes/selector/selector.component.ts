import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {

  valueSelected: string = "1";

  constructor() { }

  ngOnInit() {}

  segmentChanged(event: Event){
    this.valueSelected= (event as CustomEvent).detail.value;
  }

}
