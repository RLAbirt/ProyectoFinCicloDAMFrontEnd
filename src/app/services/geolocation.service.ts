import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private geolocation: Geolocation) { }

  public GetGPS(): string 
  {
    console.log("Geoposicion:"); 
    this.geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, 
      enableHighAccuracy: false})
            .then((resp) => {
              return resp.coords.latitude + ' ' + resp.coords.longitude;
             }).catch((error) => {
                 console.log('Error getting location', error);
                 return ""; 
             });
             return ""; 
  }

}
