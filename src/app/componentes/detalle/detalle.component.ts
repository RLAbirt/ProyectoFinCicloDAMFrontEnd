import { Component, Input, OnInit } from '@angular/core';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})

// cristina: componente para mostrar el detalle de un hotel/restaurante/alojamiento/oferta

export class DetalleComponent implements OnInit {
  @Input() municipio: string;
  @Input() territorio: string;
  @Input() nombre: string;
  @Input() descripcion: string;
  @Input() web: string;
  @Input() clase: string;
            rutaImg: any;
  
  constructor() { }

  ngOnInit() {
    console.log(`${this.municipio} ${this.territorio}`)
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
