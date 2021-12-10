import { GeolocationService } from 'src/app/services/geolocation.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { HttpService } from 'src/app/services/http.service';
import { NavigationExtras, Route, Router } from '@angular/router';
import  *  as Constants from "../../constants/constants";

@Component({
  selector: 'app-categoria-inicio',
  templateUrl: './categoria-inicio.component.html',
  styleUrls: ['./categoria-inicio.component.scss'],
})
export class CategoriaInicioComponent implements OnInit {

  @Input() titulo: string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  @Input() hoteles: Hoteles[]= [];
  @Input() casasRurales: CasasRurales[] = [];
  @Input() restaurantes: Restaurantes[] = [];
  

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };
  establecimientos: any[] = [];
  establecimiento:string = "";
  enlace:string="";
  rutaImg:string="";
  nombreIcono:string="";
  longitud: number;
  latitud: number;

  constructor(private httpService: HttpService, private router:Router, private geoService:GeolocationService) { }

  ngOnInit() {

    this.getPosicion();

    switch(this.titulo) {
      case "hoteles":
        this.establecimiento = "Hotel";

        this.httpService.getAllHoteles()
          .subscribe(resp => {
            this.establecimientos = resp.slice(0,2);
          });

        console.log(this.establecimientos);

        this.rutaImg = Constants.IMG_HOTEL;
        this.nombreIcono = Constants.ICON_HOTEL;
        
        break;
      case "restaurantes":
        this.establecimiento = "Restaurante";

        this.httpService.getAllRestaurantes()
          .subscribe(resp => {
            this.establecimientos = resp.slice(0,2);
          });

        console.log(this.establecimientos);

        this.rutaImg = Constants.IMG_RESTAURANT;
        this.nombreIcono = Constants.ICON_RESTAURANT;
        break;
      case "casas rurales":
        this.establecimiento = "Casa Rural";

        this.httpService.getByTypeCasasRurales("Agroturismos")
          .subscribe(resp => {
            this.establecimientos = resp.slice(0,2);
          });

        console.log(this.establecimientos);

        this.rutaImg = Constants.IMG_RURAL;
        this.nombreIcono = Constants.ICON_RURAL;
        break;
    }
    
  }

  /**
   * Abre la página detalle del establecimiento seleccionado
   * @param index 
   */
  abreDetalle( index ) {
    let navExtras:NavigationExtras = {
      queryParams: {
        establecimiento: this.establecimientos[index]
      }
    }

    console.log(index, this.establecimientos[index]);

    this.router.navigate(['/detalle-resultados'], navExtras);
  }

  /**
   * Abre la página de resultados del tipo de establecimiento seleccionado
   */
  abreResultado() {
    let navExtras:NavigationExtras = {
      queryParams: {
        clase: this.establecimiento
      }
    }
    this.router.navigate(['/resultados'], navExtras);
  }

  /**
   * Llama a calcular la distancia entre la localización del usuario y el establecimiento a mostrar
   * y la devuelve para mostrarlo en pantalla.
   * @param index 
   * @returns number
   */
  muestraDistancia( index:number ) : number {
    return this.geoService.calculaDistancia(this.longitud, this.latitud, 
      this.establecimientos[index].geometry.coordinates[0], this.establecimientos[index].geometry.coordinates[1]);
  }

  /**
   * Llama al servicio para que recoja las coordenadas del usuario y las asigna a variables.
   */
  getPosicion() {
    this.geoService.actualizarPosicion();
    this.longitud = this.geoService.getLongitude();
    this.latitud = this.geoService.getLatitude();
  }
}
