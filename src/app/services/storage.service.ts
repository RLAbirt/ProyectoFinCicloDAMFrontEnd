import { Injectable } from '@angular/core';
import { Storage } from '@Capacitor/storage'; 

import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../interfaces/bertoninterfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private keyRestaurantes:string = "restaurantesAlmacenados"; 
  private keyHoteles:string = "hotelesAlmacenados"; 
  private keyCasasRurales:string = "casasRuralesAlmacenados"; 
  private keyOfertas:string = "ofertasAlmacenados"; 

  private restaurantesFavoritos:Restaurantes[]; 
  private hotelesFavoritos:Hoteles[]; 
  private casasRuralesFavoritos:CasasRurales[]; 
  private ofertasFavoritos:Ofertas[]; 
  
  constructor() 
  { 
    this.obtenerFavoritos(); 
  }

  // Almacena una cadena de caracteres. Para cada string se necesita un identificador (key) y su valor (value)
  // Mediante await se indica que es un método asíncrono que devuelve una promesa
  private async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }

  // A partir de su clave identificadora (key) obtiene el valor de una cadena de caracteres almacenada en local
  private async getString(key: string): Promise<{ value: any }> {
    return await Storage.get({ key });
  }

  // Almacena un objeto con formato JSON en local.
  // Por cada objeto, se necesita una clave (key) y el valor del objeto (value)
  private async setObject(key: string, value: any) {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  // A partir de su clave obtiene un objeto almacenado en local
  // Antes de devolverlo, debe ser convertido de formato JSON a formato normal
  private async getObject(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  // Dada su clave, elimina un elemento almacenado en local independientemente de su tipo
  private async removeItem(key: string) {
    await Storage.remove({ key });
  }

  // Vacía el almacenamiento local
  private async clear() {
    await Storage.clear();
  }

  probarAlmacenamiento() {
    console.log("Aqui"); 
    this.setObject("pablo", "prueba"); 

    // Obtenemos la promesa que devuelve getObject()
    // Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<String> = this.getObject("pablo");
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if(data) {
      console.log(data);
      }
    })   

    this.clear(); 
  }

  /*
  <ion-list>
    <ion-item *ngFor="let poi of poiList; let i= index" (click)="openPage(poi, i)">
      <h2> {{ poi.name }} </h2>
    </ion-item>
  </ion-list>
  https://stackoverflow.com/questions/44617412/ionic-3-get-index-of-clicked-item
  */ 

  private ObtenerRestaurantesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject()
    // Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Restaurantes[]> = this.getObject(this.keyRestaurantes);
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if(data) {
      this.restaurantesFavoritos = data; 
      }
    })   
  }

  private ObtenerHotelesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject()
    // Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Hoteles[]> = this.getObject(this.keyHoteles);
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if(data) {
      this.hotelesFavoritos = data; 
      }
    }) 
  }

  private obtenerCasasRuralesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject()
    // Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<CasasRurales[]> = this.getObject(this.keyCasasRurales);
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if(data) {
      this.casasRuralesFavoritos = data; 
      }
    }) 
  }

  private obtenerOfertasFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject()
    // Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Ofertas[]> = this.getObject(this.keyOfertas);
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if(data) {
      this.ofertasFavoritos = data; 
      }
    }) 
  }

  public obtenerFavoritos()
  {
    this.ObtenerRestaurantesFavoritos(); 
    this.ObtenerHotelesFavoritos(); 
    this.obtenerCasasRuralesFavoritos(); 
    this.obtenerOfertasFavoritos(); 
  }

  public getRestaurantesFavoritos():Restaurantes[]
  {
    return this.restaurantesFavoritos; 
  }

  public getHotelesFavoritos():Hoteles[]
  {
    return this.hotelesFavoritos; 
  }

  public getCasasRuralesFavoritos():CasasRurales[]
  {
    return this.casasRuralesFavoritos; 
  }

  public getOfertasFavoritos():Ofertas[]
  {
    return this.ofertasFavoritos; 
  }

  public aniadirRestauranteFavorito(restauranteFavorito:Restaurantes)
  {
    this.restaurantesFavoritos = [...this.restaurantesFavoritos, restauranteFavorito];
    this.setObject(this.keyRestaurantes, this.restaurantesFavoritos); 
  }

  public quitarRestauranteFavorito(indice: number)
  {
    let restaurantesInicio = this.restaurantesFavoritos.slice(0, indice); // Copia primera parte del array
    let restaurantesFinal= this.restaurantesFavoritos.slice(indice + 1); // Copia la parte final
    this.restaurantesFavoritos = [...restaurantesInicio, ...restaurantesFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyRestaurantes, this.restaurantesFavoritos); 
  }

  public aniadirHotelFavorito(hotelFavorito:Hoteles)
  {
    this.hotelesFavoritos = [...this.hotelesFavoritos, hotelFavorito];
    this.setObject(this.keyHoteles, this.hotelesFavoritos); 
  }

  public quitarHotelFavorito(indice: number)
  {
    let hotelesInicio = this.hotelesFavoritos.slice(0, indice); // Copia primera parte del array
    let hotelesFinal= this.hotelesFavoritos.slice(indice + 1); // Copia la parte final
    this.hotelesFavoritos = [...hotelesInicio, ...hotelesFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyHoteles, this.hotelesFavoritos); 
  }

  public aniadirCasaRuralFavorito(casaRuralFavorito:CasasRurales)
  {
    this.casasRuralesFavoritos = [...this.casasRuralesFavoritos, casaRuralFavorito];
    this.setObject(this.keyCasasRurales, this.casasRuralesFavoritos); 
  }

  public quitarCasaRuralFavorito(indice: number)
  {
    let casasRuralesInicio = this.casasRuralesFavoritos.slice(0, indice); // Copia primera parte del array
    let casasRuralesFinal= this.casasRuralesFavoritos.slice(indice + 1); // Copia la parte final
    this.casasRuralesFavoritos = [...casasRuralesInicio, ...casasRuralesFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyCasasRurales, this.casasRuralesFavoritos); 
  }

  public aniadirOfertaFavorito(ofertaFavorito:Ofertas)
  {
    this.ofertasFavoritos = [...this.ofertasFavoritos, ofertaFavorito];
    this.setObject(this.keyOfertas, this.ofertasFavoritos); 
  }

  public quitarOfertaFavorito(indice: number)
  {
    let ofertasInicio = this.ofertasFavoritos.slice(0, indice); // Copia primera parte del array
    let ofertasFinal= this.ofertasFavoritos.slice(indice + 1); // Copia la parte final
    this.ofertasFavoritos = [...ofertasInicio, ...ofertasFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyOfertas, this.ofertasFavoritos); 
  }

  public borrarFavoritos()
  {
    this.restaurantesFavoritos = [];
    this.hotelesFavoritos = []; 
    this.casasRuralesFavoritos = []; 
    this.ofertasFavoritos = []; 
    this.clear(); 
  }

}
