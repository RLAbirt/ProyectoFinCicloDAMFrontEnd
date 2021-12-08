import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private latitude: number = 0; 
  private longitude: number = 0; 

  constructor(private geolocation: Geolocation) 
  { 
    this.actualizarPosicion();
  }

  public actualizarPosicion(): void
  {
    this.geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, 
      enableHighAccuracy: false})
            .then((resp) => {
              
              this.latitude = resp.coords.latitude; 
              this.longitude = resp.coords.longitude;
             }).catch((error) => {
                 console.log('Error getting location', error);
             });
  }

  public getLatitude(): number
  {
    return this.latitude;     
  }

  public getLongitude(): number
  {
    return this.longitude; 
  }
}
