import { GeolocationService } from 'src/app/services/geolocation.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  Hoteles,
  Restaurantes,
  CasasRurales,
  Ofertas,
} from '../../interfaces/bertoninterfaces';
import { HttpService } from 'src/app/services/http.service';
import { NavigationExtras, Route, Router } from '@angular/router';
import * as Constants from '../../constants/constants';

@Component({
  selector: 'app-categoria-inicio-restaurantes',
  templateUrl: './categoria-inicio-restaurantes.component.html',
  styleUrls: ['./categoria-inicio-restaurantes.component.scss'],
})

/** Componente que se usa en la pagina home, muestra los restaurantes */
export class CategoriaInicioRestaurantesComponent implements OnInit {
  @Input() titulo: string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };
  restaurantes: Restaurantes[] = [];
  establecimiento: string = '';
  enlace: string = '';
  nombreIcono: string = '';
  longitud: number = 0;
  latitud: number = 0;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private geoService: GeolocationService
  ) {}

  /**
   * Actualiza la geolocalización y carga los restaurantes
   */
  ngOnInit() {
    this.geoService.actualizarPosicion().then(() => {
      this.latitud = this.geoService.getLatitude();
      this.longitud = this.geoService.getLongitude();
      this.cargaComponente();
    });
  }

  /**
   * función que nos devuelve los dos primeros restaurantes y los carga en la pagina
   */
  cargaComponente() {
    this.establecimiento = 'Restaurantes';

    this.httpService
      .getByGeoRestaurantes(this.longitud, this.latitud, 20)
      .subscribe((resp) => {
        this.restaurantes = resp.slice(0, 2);
      });

    this.nombreIcono = Constants.ICON_RESTAURANT;
  }

  /**
   * Abre la página de resultados del tipo de establecimiento seleccionado
   */
  abreResultado() {
    let navExtras: NavigationExtras = {
      queryParams: {
        clase: this.establecimiento.toLowerCase(),
      },
    };
    this.router.navigate(['/resultados'], navExtras);
  }
}
