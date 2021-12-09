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

  constructor(private httpService:HttpService, private geoService:GeolocationService) {}

  ngOnInit(): void {
    this.getPosicion();
    
    this.httpService.getAllHoteles()
      .subscribe( resp => {
        console.log(resp);
        this.hoteles = resp;
      }, err => {
        console.log(err);
      });
    this.httpService.getAllRestaurantes()
      .subscribe(resp => {
        this.restaurantes = resp.slice(0,2);
      });
    this.httpService.getAllCasasRurales()
      .subscribe( resp => {
        this.casasRurales = resp.slice(0,2);
      } );
    this.httpService.getAllOfertas()
      .subscribe( resp => {
        this.ofertas = resp.slice(0,2);
      });
  }

  getPosicion() {
    this.geoService.actualizarPosicion();
  }
}
