import { StorageService } from './../../services/storage.service';
import { GeolocationService } from './../../services/geolocation.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import {
  Hoteles,
  Restaurantes,
  CasasRurales,
  Ofertas,
} from '../../interfaces/bertoninterfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categorias: string[] = ['Hoteles', 'Restaurantes', 'Casas Rurales'];

  hoteles: Hoteles[] = [];
  restaurantes: Restaurantes[] = [];
  casasRurales: CasasRurales[] = [];
  ofertas: Ofertas[] = [];

  // Cargamos en los arrays de favoritos lo que hay en el storage
  constructor(
    private httpService: HttpService,
    private geoService: GeolocationService,
    private storageService: StorageService
  ) {
    this.obtenerFavoritos();
  }

  /**
   * Actualiza la geolocalización
   */
  ngOnInit(): void {
    this.getPosicion();
  }

  getPosicion() {
    this.geoService.actualizarPosicion();
  }

  // inicializamos el almacenamiento local
  // cargamos en los arrays de favoritos lo que hay en el storage
  obtenerFavoritos() {
    this.storageService.obtenerFavoritos();
    console.log('cargamos los 4 arrays posibles de favoritos');
    console.log(this.storageService.getRestaurantesFavoritos());
    console.log(this.storageService.getHotelesFavoritos());
    console.log(this.storageService.getCasasRuralesFavoritos());
    console.log(this.storageService.getOfertasFavoritos());
  }
}
