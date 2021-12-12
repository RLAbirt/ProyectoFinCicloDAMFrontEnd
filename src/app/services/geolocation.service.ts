import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private latitude: number = 0; 
  private longitude: number = 0; 

  constructor(private geolocation: Geolocation) { }

  public actualizarPosicion() //: Observable<Geoposition>
  {
    return this.geolocation.getCurrentPosition({maximumAge: 5000, timeout: 5000, 
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

  public calculaDistancia(lon1:number, lat1:number, lon2:number, lat2:number): number {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    console.log('d',d);
    var e = Math.round(d*10)/10;
    console.log('round',e);

    return e;
  }

  public deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}
