import { NavController, ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import  *  as Constants from "../../constants/constants";
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';
import { StorageService } from 'src/app/services/storage.service';

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
                public navCtrl: NavController, private activateRoute: ActivatedRoute,
                private httpService: HttpService, public storageService: StorageService, 
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

    this.geoService.actualizarPosicion()
      .then(() => {
        this.lat = this.geoService.getLatitude(); 
        this.lon = this.geoService.getLongitude();
        
        this.distSelect = 20;

        console.log(this.distSelect); 
          
        this.loadPage();
      })
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

  // devuelve -1 si no es favorito. Devuelve el indice de donde se encuentra el establecimiento
  public esFavorito(item:any): boolean {
     // this.clase: restaurantes, hoteles, alojamientos, ofertas
     let indiceAux: number = -1;

     switch(this.clase) {
      case "restaurantes":
        indiceAux = this.storageService.esFavoritoEstablecimiento(
                              this.storageService.restaurantesFavoritos, item, this.storageService.keyRestaurantes);
        break;
      case "hoteles":
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.hotelesFavoritos, item, this.storageService.keyHoteles);
        break;
      case "alojamientos":
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.casasRuralesFavoritos, item, this.storageService.keyCasasRurales);
        break;
      case "ofertas":
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.ofertasFavoritos, item, this.storageService.keyOfertas);
        break;
      default:
        console.log("Error desconocido en Berton");
    }
    return indiceAux != -1;   
  }


  quitarFavoritos(item:any) {
    
    let indice: number = -1;    
    
    // this.clase: restaurantes, hoteles, alojamientos, ofertas
    switch(this.clase) {
      case "restaurantes":
        this.storageService.quitarRestauranteFavorito(item);
        break;
      case "hoteles":
        this.storageService.quitarHotelFavorito(item);
        break;
      case "alojamientos":
        this.storageService.quitarCasaRuralFavorito(item); 
        break;
      case "ofertas":
        this.storageService.quitarOfertaFavorito(item);
        break;
      default:
        console.log("Error desconocido en Berton");
    }
  }

  anadirFavoritos(item:any) {
    // this.clase: restaurantes, hoteles, alojamientos, ofertas
    switch(this.clase) {
      case "restaurantes":
        this.storageService.aniadirRestauranteFavorito(item);
        break;
      case "hoteles":
        this.storageService.aniadirHotelFavorito(item);
        break;
      case "alojamientos":
        this.storageService.aniadirCasaRuralFavorito(item); 
        break;
      case "ofertas":
        this.storageService.aniadirOfertaFavorito(item);
        break;
      default:
        console.log("Error desconocido en Berton");
    }
  }

}
