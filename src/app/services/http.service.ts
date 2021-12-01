import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establecimiento } from '../models/InterfacesMock.interface';
import { Hotel } from '../models/Hotel';
import { CasaRural } from '../models/CasaRural';
import { Restaurante } from './../models/Restaurante';
import { Oferta } from '../models/Oferta';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import 'rxjs/Rx';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl:string = 'https://10.2.106.162.labs.birt.eus:8081/';
  private apiUrlMock: string = 'http://localhost:3000/api';
  

  constructor(private http:HttpClient) { }

  public getAllOfertas() :Observable<Oferta[]>{
    return this.http.get<Oferta[]>(`${this.apiUrlMock}/ofertas`)
  }

  public getAllHoteles() :Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrlMock}/hoteles`);
  }

  public getByGeoHoteles(lon: number, lat: number, dist: number) :Observable<Hotel[]> {
    let paramsGH = new HttpParams();
    paramsGH.append('lon',lon);
    paramsGH.append('lat', lat);
    paramsGH.append('dist', dist);

    return this.http.get<Hotel[]>(`${this.apiUrlMock}/hoteles/geo`,{params: paramsGH});
  }

  public getSliceHoteles():Observable<Hotel[]> {
    const params = new HttpParams();
    params.set('_start', 0)
    params.set('_end', 2);

    return this.http.get<Hotel[]>(`${this.apiUrlMock}/hoteles/?_start=0&_end=2`);
  }

  public getAllCasasRurales():Observable<CasaRural[]> {
    return this.http.get<CasaRural[]>(`${this.apiUrlMock}/casasrurales`);
  }

  public getByTypeCasasRurales(tipo: string):Observable<CasaRural[]> {
    let paramsR = new HttpParams();
    paramsR.set('type', tipo)
    paramsR.set('_end', 2);

    return this.http.get<CasaRural[]>(`${this.apiUrlMock}/casasrurales/`,{params: paramsR});
  }

  public getSliceCasasRurales(): Observable<CasaRural[]>{
    let paramsSC = new HttpParams();
    paramsSC.set('_start', 0)
    paramsSC.set('_end', 2);

    return this.http.get<Hotel[]>(`${this.apiUrlMock}/casasrurales/`,{params: paramsSC});
  }

  public getByGeoCasasRurales(lon: number, lat: number, dist: number, tipo: string) : Observable<CasaRural[]> {
    let paramsGC = new HttpParams();
    paramsGC.append('lon',lon);
    paramsGC.append('lat', lat);
    paramsGC.append('dist', dist);
    paramsGC.append('type', tipo);

    return this.http.get<CasaRural[]>(`${this.apiUrlMock}/casasrurales/geo`,{params: paramsGC});
  }

  public getAllRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrlMock}/restaurantes`);
  }

  public getByGeoRestaurantes(lon: number, lat: number, dist: number): Observable<Restaurante[]> {
    let paramsGR = new HttpParams();
    paramsGR.append('lon',lon);
    paramsGR.append('lat', lat);
    paramsGR.append('dist', dist);

    return this.http.get<Restaurante[]>(`${this.apiUrlMock}/restaurantes/geo`,{params: paramsGR});
  }

  public getSliceRestaurantes() : Observable<Restaurante[]>{
    let paramsSR = new HttpParams();
    paramsSR.set('_start', 0)
    paramsSR.set('_end', 2);

    return this.http.get<Hotel[]>(`${this.apiUrlMock}/restaurantes`,{params: paramsSR});
  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return throwError(err.message);
  }
  
}
