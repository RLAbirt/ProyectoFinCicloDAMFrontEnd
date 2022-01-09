import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../interfaces/bertoninterfaces';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/** Servicio usado para las consultas a la API */
export class HttpService {

  constructor(private http:HttpClient) { }

  /**
   * 
   * @returns nos devuelve todas las ofertas que hay en la API
   */
  public getAllOfertas() :Observable<Ofertas[]>{
    return this.http.get<Ofertas[]>('/api/ofertas');
  }

  /**
   * 
   * @returns nos devuelve todos los hoteles que hay en la API
   */
  public getAllHoteles() :Observable<Hoteles[]> {
    return this.http.get<Hoteles[]>('/api/hoteles');
  }

  /**
   * 
   * @param lon 
   * @param lat 
   * @param dist 
   * @returns nos devuelve todos los hoteles que hay a una distancia determinada teniendo en cuenta la geolocalización del usuario
   */
  public getByGeoHoteles(lon: number, lat: number, dist: number) :Observable<Hoteles[]> {
    let paramsGH = new HttpParams();
    paramsGH.append('lon',lon);
    paramsGH.append('lat', lat);
    paramsGH.append('dist', dist);
    
    return this.http.get<Hoteles[]>(`/api/hoteles/geo?dist=${dist}&lat=${lat}&lon=${lon}`);
  }

  /**
   * 
   * @returns nos devuelve todas las casas rurales de la API
   */
  public getAllCasasRurales():Observable<CasasRurales[]> {
    return this.http.get<CasasRurales[]>('/api/casasrurales');
  }

  /**
   * 
   * @param tipo 
   * @returns nos devuelve todas las casas rurales
   */
  public getByTypeCasasRurales(tipo: string):Observable<CasasRurales[]> {
    let paramsR = new HttpParams();
    paramsR.append('type', tipo)
    paramsR.set('_start', 0)
    paramsR.set('_end', 2);

    return this.http.get<CasasRurales[]>('/api/casasrurales/', {params: paramsR});
  }

  /**
   * 
   * @param lon 
   * @param lat 
   * @param dist 
   * @param tipo 
   * @returns nos devuelve todas las casas rurales que hay a una distancia determinada teniendo en cuenta la geolocalización del usuario
   */
  public getByGeoCasasRurales(lon: number, lat: number, dist: number, tipo: string) : Observable<CasasRurales[]> {
    let paramsGC = new HttpParams();
    paramsGC.append('lon',lon);
    paramsGC.append('lat', lat);
    paramsGC.append('dist', dist);
    paramsGC.append('type', tipo);

    return this.http.get<Hoteles[]>(`/api/casasrurales/geo?dist=${dist}&lat=${lat}&lon=${lon}&type=${tipo}`);
  }

  /**
   * 
   * @returns nos devuelve todos los restaurantes de la API
   */
  public getAllRestaurantes(): Observable<Restaurantes[]> {
    return this.http.get<Restaurantes[]>('/api/restaurantes');
  }

  /**
   * 
   * @param lon 
   * @param lat 
   * @param dist 
   * @returns nos devuelve todos los restaurantes que hay a una distancia determinada teniendo en cuenta la geolocalización del usuario
   */
  public getByGeoRestaurantes(lon: number, lat: number, dist: number): Observable<Restaurantes[]> {
    let paramsGR = new HttpParams();
    paramsGR.append('lon',lon);
    paramsGR.append('lat', lat);
    paramsGR.append('dist', dist);

    return this.http.get<Hoteles[]>(`/api/restaurantes/geo?dist=${dist}&lat=${lat}&lon=${lon}`);
  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return throwError(err.message);
  }
  
}
