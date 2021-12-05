import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categorias: string[] = ['Hoteles', 'Restaurantes', 'Casas Rurales'];

  hoteles: Hoteles[] = [];

  constructor(private httpService:HttpService, private geolocation: Geolocation) {}

  ngOnInit(): void {
    this.httpService.getSliceHoteles()
      .subscribe( resp => {
        console.log(resp);
        this.hoteles = resp;
      })
  }

  abrirGPS(): void {
    console.log("Geoposicion:"); 
    this.geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, 
      enableHighAccuracy: false})
            .then((resp) => {
              console.log(resp.coords.latitude);
              console.log(resp.coords.longitude);
             }).catch((error) => {
                 console.log('Error getting location', error);
             });
  }
}
