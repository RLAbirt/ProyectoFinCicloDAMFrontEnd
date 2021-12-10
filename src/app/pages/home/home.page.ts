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

  categorias: string[] = ['hoteles', 'restaurantes', 'casas rurales'];
  hoteles: Hoteles[] = [];
  restaurantes: Restaurantes[] = [];
  casasRurales: CasasRurales[] = [];
  ofertas: Ofertas[] = [];
  longitud: number = 0;
  latitud: number = 0;

  constructor(private httpService:HttpService, private geoService:GeolocationService) {}

  ngOnInit(): void {
    
  }

  
}
