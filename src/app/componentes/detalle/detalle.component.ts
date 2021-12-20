import { Component, Input, OnInit } from '@angular/core';
import * as Constants from '../../constants/constants';
import { ModalController } from '@ionic/angular'; 
import { NavigationExtras, Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
           rutaImg: string;
  
  constructor(private router:Router, private activateRoute: ActivatedRoute) { }

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
