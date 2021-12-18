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
            rutaImg: any;
  
  constructor(private router:Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {    
    this.activateRoute.queryParams.subscribe(
      params => {
        this.municipio = params['municipio'];
        this.territorio = params['territorio'];
        this.nombre = params['nombre'];
        this.descripcion = params['nombre'];
        this.web = params['web'];
        this.clase =  params['clase'];
      });
    console.log(this.clase);  
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


  /* PRUEBA DE MODAL BASICA DE PABLO
  dismiss() {
    console.log ("Cerrar Modal"); 
    this.modalCTRL.dismiss({dismissed: true});
  }
  */

}
