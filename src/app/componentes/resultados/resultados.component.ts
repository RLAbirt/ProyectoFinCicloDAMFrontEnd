import { AVA_HOTEL, AVA_OFERTA, AVA_RESTAURANT, AVA_RURAL } from './../../constants/constants';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { NavigationExtras, Router } from '@angular/router';
import  *  as Constants from "../../constants/constants";

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
                private router:Router, public navCtrl: NavController, 
                private httpService: HttpService, private activateRoute: ActivatedRoute,
                private geoService:GeolocationService) { }

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
    //this.distSelect = this.distService.getData();
    console.log(this.distSelect); 
      
    this.loadPage();
  }

  private loadPage(){
    if(this.clase == "hoteles"){
      this.httpService.getByGeoHoteles(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        //console.log(resp);
        this.image = AVA_HOTEL;
        this.listado = <Hoteles[]>resp;
      })
    }else if(this.clase == "alojamientos"){
      this.httpService.getByGeoCasasRurales(this.lon,this.lat,this.distSelect, Constants.CASA_RURAL_TYPE)
      .subscribe(resp => {
        //console.log(resp);
        this.image = AVA_RURAL;
        this.listado = <CasasRurales[]>resp;
      })
    }else if(this.clase == "restaurantes"){
      this.httpService.getByGeoRestaurantes(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        //console.log(resp);
        this.image = AVA_RESTAURANT;
        this.listado = <Restaurantes[]>resp;
      })
    }else if(this.clase == "ofertas"){
      this.httpService.getAllOfertas()
      .subscribe(resp => {
        //console.log(resp);
        this.image = AVA_OFERTA;
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

  public abrirModal(id: any){
    for (let i=0; i < this.listado.length; i++){
      if(this.listado[i]._id== id){
        this.seleccion = this.listado[i];
      }
    }

    console.log(this.seleccion.properties.municipality);
    console.log(this.seleccion.properties.territory);
    console.log(this.seleccion.properties.documentname); 
    console.log(this.seleccion.properties.turismdescription); 
    console.log(this.seleccion.properties.web); 
    console.log(this.clase); 

    let navExtras:NavigationExtras = {
      queryParams: {
        municipio: this.seleccion.properties.municipality,
        territorio: this.seleccion.properties.territory,
        nombre: this.seleccion.properties.documentname,
        descripcion: this.seleccion.properties.turismdescription,
        web: this.seleccion.properties.web,
        clase: this.clase
      }
    }
    this.router.navigate(['/detalle-resultados'], navExtras);

    /*
    //PRUEBA DE MODAL BÁSICA DE PABLO
    const modal = await this.mdlCtrl.create({
      component: DetalleResultadosPage,      
    }); 

    await modal.present();
    const {data} = await modal.onWillDismiss()
    console.log (data); 
    */

    /*
    //CODIGO ORIGINAL DE ROCIO
    const modal = await this.mdlCtrl.create({
      component: DetalleResultadosPage,
      componentProps: {
        'municipio': [this.seleccion.properties.municipality],
        'territorio': [this.seleccion.properties.territory],
        'nombre': [this.seleccion.properties.documentname],
        'descripcion': [this.seleccion.properties.turismdescription],
        'web': [this.seleccion.properties.web],
        'clase': [this.clase],
      },
      cssClass: 'my-custom-class',
    });

    await modal.present();
    */
  }
  
}
