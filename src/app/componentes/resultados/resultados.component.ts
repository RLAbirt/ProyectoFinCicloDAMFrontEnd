import { ModalController, NavController } from '@ionic/angular';
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';
import { HttpService } from 'src/app/services/http.service';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
           distSelect: number = SelectorComponent.getDistance();
           lon: number;
           lat: number;
           tipo: string;
           clase: string;
           seleccion: any;


  constructor(
                private mdlCtrl: ModalController, public navCtrl: NavController, 
                private httpService: HttpService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(
      params => {
        this.clase =  params['clase'];
      });

    this.lat = GeolocationService.GetLatitude(); 
    
    this.lon = GeolocationService.GetLongitude();

    if(this.clase == "hoteles"){
      this.httpService.getByGeoHoteles(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        console.log(resp);
        this.listado = <Hoteles>resp;
      })
    }else if(this.clase == "alojamientos"){
      this.httpService.getByGeoCasasRurales(this.lon,this.lat,this.distSelect, this.tipo)
      .subscribe(resp => {
        console.log(resp);
        this.listado = <CasasRurales>resp;
      })
    }else if(this.clase == "restaurantes"){
      this.httpService.getByGeoRestaurantes(this.lon,this.lat,this.distSelect)
      .subscribe(resp => {
        console.log(resp);
        this.listado = <Restaurantes>resp;
      })
    }else if(this.clase == "ofertas"){
      this.httpService.getAllOfertas()
      .subscribe(resp => {
        console.log(resp);
        this.listado = <Ofertas>resp;
      })
    }
  }

  private calculateDistance(lon1, lon2, lat1, lat2){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis);
  }

  public getGeolocation(latDestino: number, lonDestino: number){
    return this.calculateDistance(this.lon, lonDestino, this.lat, latDestino);
  }

  async abrirModal(id: any){
    for (let i=0; i < this.listado.length; i++){
      if(this.listado[i]._id== id){
        this.seleccion = this.listado[i];
      }
    }

    const modal = await this.mdlCtrl.create({
      component: DetalleResultadosPage,
      cssClass: 'my-custom-class',
        componentProps: {
          'municipio': this.seleccion.properties.municipality,
          'terriotorio': this.seleccion.properties.territory,
          'nombre': this.seleccion.properties.documentname,
          'descripcion': this.seleccion.properties.turismdescription,
          'web': this.seleccion.properties.web,
        }

    });

    await modal.present();
  }
}
