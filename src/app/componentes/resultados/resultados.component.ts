import { NavController, ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import  *  as Constants from "../../constants/constants";
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
  providers: [HttpService],
})
export class ResultadosComponent implements OnInit {

  @Input() listado: any;
  @Input() distSelect: number;
           lon: number;
           lat: number;
           tipo: string;
           clase: string;
           seleccion: any;
           image: any;


  constructor(
                public navCtrl: NavController, 
                private httpService: HttpService, private activateRoute: ActivatedRoute,
                private geoService:GeolocationService, private modalController:ModalController) { }

  ngOnInit() {
    
    this.activateRoute.queryParams.subscribe(
      params => {
        this.clase =  params['clase'];
        this.loadPage();
      });
    console.log(this.clase);
    
    this.lat = this.geoService.getLatitude(); 
    this.lon = this.geoService.getLongitude();
    
    this.distSelect = 20;

    console.log(this.distSelect); 
      
    this.loadPage();
  }

  private loadPage(){
    if(this.clase == "hoteles"){
      this.httpService.getByGeoHoteles(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        //console.log(resp);
        this.image = Constants.AVA_HOTEL;
        this.listado = <Hoteles[]>resp;
      })
    }else if(this.clase == "alojamientos"){
      this.httpService.getByGeoCasasRurales(this.lon,this.lat,this.distSelect, Constants.CASA_RURAL_TYPE)
      .subscribe(resp => {
        //console.log(resp);
        this.image = Constants.AVA_RURAL;
        this.listado = <CasasRurales[]>resp;
      })
    }else if(this.clase == "restaurantes"){
      this.httpService.getByGeoRestaurantes(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        //console.log(resp);
        this.image = Constants.AVA_RESTAURANT;
        this.listado = <Restaurantes[]>resp;
      })
    }else if(this.clase == "ofertas"){
      this.httpService.getAllOfertas()
      .subscribe(resp => {
        //console.log(resp);
        this.image = Constants.AVA_OFERTA;
        this.listado = <Ofertas[]>resp;
      })
    }
  }

  public muestraDistancia(latDestino: number, lonDestino: number){
    return this.geoService.calculaDistancia(this.lat, this.lon, lonDestino, latDestino);
  }

  ngOnChanges() {
    this.loadPage();
  }

  async abrirModal(item:any){
    const modal = await this.modalController.create({
      component: DetalleResultadosPage,
      componentProps: {
        'municipio': item.properties.municipality,
        'territorio': item.properties.territory,
        'nombre': item.properties.documentname,
        'descripcion': item.properties.turismdescription,
        'web': item.properties.web,
        'clase': this.clase,
      }
    });

    await modal.present();
    
  }
  
}
