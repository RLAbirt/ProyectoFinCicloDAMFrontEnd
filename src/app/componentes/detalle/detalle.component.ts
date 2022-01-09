import { Component, Input, OnInit } from '@angular/core';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})

/** Componente que se usa en la pagina modal de ver detalle un establecimiento u oferta */

export class DetalleComponent implements OnInit {
  @Input() municipio: string;
  @Input() territorio: string;
  @Input() nombre: string;
  @Input() descripcion: string;
  @Input() web: string;
  @Input() clase: string;
           rutaImg: string;
  
  constructor() { }

  /**
   * Dependiendo del tipo de establecimiento asigna una imagen a la variable e mostrar en la pagina de ver detalle
   */

  ngOnInit() {    
    switch(this.clase.toLowerCase()) {
      case 'hoteles':
        this.rutaImg = Constants.IMG_HOTEL;
        break;
      case 'restaurantes':
        this.rutaImg = Constants.IMG_RESTAURANT;
        break;
      case 'casas rurales':
        this.rutaImg = Constants.IMG_RURAL;
        break;
    }
  }
}
