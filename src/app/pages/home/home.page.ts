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

  hoteles: Hoteles;

  constructor(private httpService:HttpService, private geoService:GeolocationService) {}

  ngOnInit(): void {
    GeolocationService.ActualizarPosicion(); 
    this.httpService.getSliceHoteles()
      .subscribe( resp => {
        console.log(resp);
        this.hoteles = resp;
      })
  }

  abrirGPS(): void {
    console.log('Geoposicion: ' + GeolocationService.GetLatitude() + ', ' + GeolocationService.GetLongitude()); 
  }
}
