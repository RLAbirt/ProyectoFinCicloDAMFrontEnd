import { ModalController } from '@ionic/angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as Constants from '../../constants/constants';
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';

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
  
  rutaImg:string="";


  constructor( private router:Router, private geoService:GeolocationService,
               private modalController:ModalController ) { }

  ngOnInit() {
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
  async abreModal() {
    const modal = await this.modalController.create({
      component: DetalleResultadosPage,
      componentProps: {
        'municipio': this.establecimiento.properties.municipality,
        'territorio': this.establecimiento.properties.territory,
        'nombre': this.establecimiento.properties.documentname,
        'descripcion': this.establecimiento.properties.turismdescription,
        'web': this.establecimiento.properties.web,
        'clase': this.tipo,
      }
    });

    await modal.present();
  }
}
