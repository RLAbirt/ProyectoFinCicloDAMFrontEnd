import { AVA_HOTEL, AVA_OFERTA, AVA_RESTAURANT, AVA_RURAL } from './../../constants/constants';
import { ModalController, NavController } from '@ionic/angular';
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';
import { HttpService } from 'src/app/services/http.service';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
  providers: [HttpService],
})
export class ResultadosComponent implements OnInit {


  @Input() listado: any;
           distSelect: number = 20;
           lon: number;
           lat: number;
           tipo: string;
           clase: string;
           seleccion: any;
           image: any;


  constructor(
                private mdlCtrl: ModalController, public navCtrl: NavController, 
                private httpService: HttpService, private activateRoute: ActivatedRoute,
                private geoService:GeolocationService) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(
      params => {
        this.clase =  params['clase'];
      });
    console.log(this.clase);    
    this.lat = this.geoService.getLatitude(); 
    console.log(this.lat);
    this.lon = this.geoService.getLongitude();
    console.log(this.lon); 
    //this.distSelect = SelectorComponent.getDistance();
    console.log(this.distSelect); 
   
    if(this.clase == "hoteles"){
      this.httpService.getByGeoHoteles(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        console.log(resp);
        this.image = AVA_HOTEL;
        this.listado = <Hoteles[]>resp;
      })
    }else if(this.clase == "alojamientos"){
      this.httpService.getByGeoCasasRurales(this.lon,this.lat,this.distSelect, this.tipo)
      .subscribe(resp => {
        console.log(resp);
        this.image = AVA_RURAL;
        this.listado = <CasasRurales[]>resp;
      })
    }else if(this.clase == "restaurantes"){
      this.httpService.getByGeoRestaurantes(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        console.log(resp);
        this.image = AVA_RESTAURANT;
        this.listado = <Restaurantes[]>resp;
      })
    }else if(this.clase == "ofertas"){
      this.httpService.getAllOfertas()
      .subscribe(resp => {
        console.log(resp);
        this.image = AVA_OFERTA;
        this.listado = <Ofertas[]>resp;
      })
    }
  }

  public muestraDistancia(latDestino: number, lonDestino: number){
    return this.geoService.calculaDistancia(this.lon, this.lat, lonDestino, latDestino);
  }

  async abrirModal(id: any){
    for (let i=0; i < this.listado.length; i++){
      if(this.listado[i]._id== id){
        this.seleccion = this.listado[i];
      }
    }

    const modal = await this.mdlCtrl.create({
      component: DetalleResultadosPage,
      componentProps: {
        'municipio': [this.seleccion.properties.municipality],
        'terriotorio': [this.seleccion.properties.territory],
        'nombre': [this.seleccion.properties.documentname],
        'descripcion': [this.seleccion.properties.turismdescription],
        'web': [this.seleccion.properties.web],
        'clase': [this.clase],
      },
      cssClass: 'my-custom-class',
    });

    await modal.present();
  }
}
