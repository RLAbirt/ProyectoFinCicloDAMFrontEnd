import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../interfaces/bertoninterfaces';
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

  public getAllOfertas() :Observable<Ofertas[]>{
    return this.http.get<Ofertas[]>(`${this.apiUrlMock}/ofertas`)
  }

  public getAllHoteles() :Observable<Hoteles[]> {
    return this.http.get<Hoteles[]>(`${this.apiUrlMock}/hoteles`);
  }

  public getByGeoHoteles(lon: number, lat: number, dist: number) :Observable<Hoteles[]> {
    let paramsGH = new HttpParams();
    paramsGH.append('lon',lon);
    paramsGH.append('lat', lat);
    paramsGH.append('dist', dist);

    return this.http.get<Hoteles[]>(`${this.apiUrlMock}/hoteles/geo`,{params: paramsGH});
  }

  public getSliceHoteles():Observable<Hoteles[]> {
    const params = new HttpParams();
    params.set('_start', 0)
    params.set('_end', 2);

    return this.http.get<Hoteles[]>(`${this.apiUrlMock}/hoteles/?_start=0&_end=2`);
  }

  public getAllCasasRurales():Observable<CasasRurales[]> {
    return this.http.get<CasasRurales[]>(`${this.apiUrlMock}/casasrurales`);
  }

  public getByTypeCasasRurales(tipo: string):Observable<CasasRurales[]> {
    let paramsR = new HttpParams();
    paramsR.set('type', tipo)
    paramsR.set('_end', 2);

    return this.http.get<CasasRurales[]>(`${this.apiUrlMock}/casasrurales/`,{params: paramsR});
  }

  public getSliceCasasRurales(): Observable<CasasRurales[]>{
    let paramsSC = new HttpParams();
    paramsSC.set('_start', 0)
    paramsSC.set('_end', 2);

    return this.http.get<Hoteles[]>(`${this.apiUrlMock}/casasrurales/`,{params: paramsSC});
  }

  public getByGeoCasasRurales(lon: number, lat: number, dist: number, tipo: string) : Observable<CasasRurales[]> {
    let paramsGC = new HttpParams();
    paramsGC.append('lon',lon);
    paramsGC.append('lat', lat);
    paramsGC.append('dist', dist);
    paramsGC.append('type', tipo);

    return this.http.get<CasasRurales[]>(`${this.apiUrlMock}/casasrurales/geo`,{params: paramsGC});
  }

  public getAllRestaurantes(): Observable<Restaurantes[]> {
    return this.http.get<Restaurantes[]>(`${this.apiUrlMock}/restaurantes`);
  }

  public getByGeoRestaurantes(lon: number, lat: number, dist: number): Observable<Restaurantes[]> {
    let paramsGR = new HttpParams();
    paramsGR.append('lon',lon);
    paramsGR.append('lat', lat);
    paramsGR.append('dist', dist);

    return this.http.get<Restaurantes[]>(`${this.apiUrlMock}/restaurantes/geo`,{params: paramsGR});
  }

  public getSliceRestaurantes() : Observable<Restaurantes[]>{
    let paramsSR = new HttpParams();
    paramsSR.set('_start', 0)
    paramsSR.set('_end', 2);

    return this.http.get<Hoteles[]>(`${this.apiUrlMock}/restaurantes`,{params: paramsSR});
  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return throwError(err.message);
  }
  
}
