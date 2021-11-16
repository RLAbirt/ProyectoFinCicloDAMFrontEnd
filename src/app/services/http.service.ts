import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establecimiento } from '../models/InterfacesMock.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl:string = 'https://10.2.236.115.labs.birt.eus:8081/';
  private apiUrlMock: string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAllOfertas() {

  }

  getAllHoteles() {
    return this.http.get<Establecimiento[]>(`${this.apiUrlMock}/hoteles`);
  }

  getSliceHoteles() {
    const params = new HttpParams();
    params.set('_start', 0)
          .set('_end', 2);

          return this.http.get<Establecimiento[]>(`${this.apiUrlMock}/hoteles/?_start=0&_end=2`);
  }
}
