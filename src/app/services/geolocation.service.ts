import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private static geo: Geolocation; 
  private static latitude: number = 0; 
  private static longitude: number = 0; 

  constructor(private geolocation: Geolocation) 
  { 
    GeolocationService.geo = geolocation; 
    GeolocationService.ActualizarPosicion();
  }

  public static ActualizarPosicion(): void
  {
    GeolocationService.geo.getCurrentPosition({maximumAge: 5000, timeout: 5000, 
      enableHighAccuracy: false})
            .then((resp) => {
              GeolocationService.latitude = resp.coords.latitude; 
              GeolocationService.longitude = resp.coords.longitude;
             }).catch((error) => {
                 console.log('Error getting location', error);
             });
  }

  public static GetLatitude(): number
  {
    return this.latitude;     
  }

  public static GetLongitude(): number
  {
    return this.longitude; 
  }
}
