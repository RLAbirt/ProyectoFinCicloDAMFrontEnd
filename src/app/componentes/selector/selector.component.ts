import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})

/** Componente que se va a usar para indicar la distancia a buscar un establecimiento dentro de la pagina de resultados */
export class SelectorComponent implements OnInit {

  @Output() valueSelected:EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  ngOnInit() {}

  /**
   * Cuando ocurre un evento, se modifica la distancia en el rango a buscar los establecimientos
   */
  public segmentChanged(event: Event){
    this.valueSelected.emit(event);
    console.log(this.valueSelected);
  }
}
