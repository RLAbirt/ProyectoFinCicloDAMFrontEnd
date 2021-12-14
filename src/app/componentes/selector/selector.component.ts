import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {

  static valueSelected: string = "20";

  constructor() { }

  ngOnInit() {}

  private segmentChanged(event: Event){
    SelectorComponent.valueSelected= (event as CustomEvent).detail.value;
  }

  public static getDistance(){
    return +this.valueSelected;
  }

}
