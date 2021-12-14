import { StorageService } from './../../services/storage.service';
import { GeolocationService } from './../../services/geolocation.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';


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

  constructor(private httpService:HttpService, private geoService:GeolocationService, private storageService:StorageService) {}

  ngOnInit(): void {
    this.getPosicion();
  }

  getPosicion() {
    this.geoService.actualizarPosicion();
  }

  gestionarAlmacenamiento() {
    this.storageService.probarAlmacenamiento(); 
  }
}
