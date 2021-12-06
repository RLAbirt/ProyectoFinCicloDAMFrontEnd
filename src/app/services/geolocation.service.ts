import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  public GetGPS(): string 
  {
    let geolocation: Geolocation = new Geolocation();
    console.log("Geoposicion:"); 
    geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, 
      enableHighAccuracy: false})
            .then((resp) => {
              console.log (resp.coords.latitude + ' ' + resp.coords.longitude); 
              return resp.coords.latitude + ' ' + resp.coords.longitude;
             }).catch((error) => {
                 console.log('Error getting location', error);
                 return ""; 
             });
             return ""; 
  }

}
