import { GeolocationService } from 'src/app/services/geolocation.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-tarjeta-categoria-inicio',
  templateUrl: './tarjeta-categoria-inicio.component.html',
  styleUrls: ['./tarjeta-categoria-inicio.component.scss']
})
export class TarjetaCategoriaInicioComponent implements OnInit {

  @Input() establecimiento:any;
  @Input() tipo:string;
  @Input() longitud:number;
  @Input() latitud:number;

  distancia:number = 0;
  rutaImg:string="";


  constructor( private router:Router, private geoService:GeolocationService ) { }

  ngOnInit() {
    this.distancia = this.muestraDistancia();
    switch(this.tipo.toLowerCase()) {
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

  /**
   * Abre la página detalle del establecimiento seleccionado
   * @param index 
   */
  abreDetalle() {
    let navExtras:NavigationExtras = {
      queryParams: {
        establecimiento: this.establecimiento
      }
    }

    console.log(this.establecimiento);

    this.router.navigate(['/detalle-resultados'], navExtras);
  }

  /**
   * Llama a calcular la distancia entre la localización del usuario y el establecimiento a mostrar
   * y la devuelve para mostrarlo en pantalla.
   * @param index 
   * @returns number
   */
   muestraDistancia() : number {
     console.log(this.longitud, this.latitud, 
      this.establecimiento.geometry.coordinates[0], this.establecimiento.geometry.coordinates[1]);
    return this.geoService.calculaDistancia(this.longitud, this.latitud, 
      this.establecimiento.geometry.coordinates[0], this.establecimiento.geometry.coordinates[1]);
  }

}
