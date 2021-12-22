import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@Capacitor/storage'; 
import { ToastController } from '@ionic/angular';

import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../interfaces/bertoninterfaces';

@Injectable({
  providedIn: 'root'
})



export class StorageService {

  public keyRestaurantes:string = "restaurantesAlmacenados"; 
  public keyHoteles:string = "hotelesAlmacenados"; 
  public keyCasasRurales:string = "casasRuralesAlmacenados"; 
  public keyOfertas:string = "ofertasAlmacenados"; 

  public restaurantesFavoritos:Restaurantes[]=[]; 
  public hotelesFavoritos:Hoteles[]=[]; 
  public casasRuralesFavoritos:CasasRurales[]=[]; 
  public ofertasFavoritos:Ofertas[]=[]; 
  
  constructor(public toastController: ToastController) { }

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

  // Vacía el almacenamiento local
  private async clear() {
    await Storage.clear();
  }

  // Carga en el array de restaurantes favoritos el contenido del storage
  private ObtenerRestaurantesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Restaurantes[]> = this.getObject(this.keyRestaurantes);
    
    // si hay restaurantes en el storage los cargamos en nuestro array
    datosPromesa.then( (data) => {
      if(data) {
        this.restaurantesFavoritos.push(...data);
      }
    });
    
  }

  // Carga en el array de hoteles favoritos el contenido del storage
  private ObtenerHotelesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Hoteles[]> = this.getObject(this.keyHoteles);
    
    // si hay hoteles en el storage los cargamos en nuestro array
    datosPromesa.then( (data) => {
      if (data) {
        this.hotelesFavoritos.push(...data); 
      }
    }) 
  }

  // Carga en el array de casas rurales favoritos el contenido del storage
  private obtenerCasasRuralesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<CasasRurales[]> = this.getObject(this.keyCasasRurales);
    
    // si hay casas rurales en el storage los cargamos en nuestro array
    datosPromesa.then( (data) => {
      if (data) {
        this.casasRuralesFavoritos.push(...data); 
      }
    }) 
  }

  // Carga en el array de ofertas favoritos el contenido del storage
  private obtenerOfertasFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Ofertas[]> = this.getObject(this.keyOfertas);
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if (data) {
        this.ofertasFavoritos.push(...data); 
      }
    }) 
  }

  // carga en los cuatro arrays de favoritos el contenido del storage
  public obtenerFavoritos()
  {
    this.ObtenerRestaurantesFavoritos(); 
    this.ObtenerHotelesFavoritos(); 
    this.obtenerCasasRuralesFavoritos(); 
    this.obtenerOfertasFavoritos(); 
  }

  // devuelve el array de restaurantes favoritos
  public getRestaurantesFavoritos():Restaurantes[]
  {
    return this.restaurantesFavoritos; 
  }

  // devuelve el array de hoteles favoritos
  public getHotelesFavoritos():Hoteles[]
  {
    return this.hotelesFavoritos; 
  }

  // devuelve el array de casas rurales favoritas
  public getCasasRuralesFavoritos():CasasRurales[]
  {
    return this.casasRuralesFavoritos; 
  }

  // devuelve el array de ofertas favoritas
  public getOfertasFavoritos():Ofertas[]
  {
    return this.ofertasFavoritos; 
  }

  //devuelve si el establecimiento esta en favoritos
  public esFavoritoEstablecimiento(listaEstablecimientosFavoritos: any, establecimientoFavorito: any, key:string):boolean {
    let esEncontradoEstablecimiento: boolean = false;
    if (listaEstablecimientosFavoritos.length > 0) {
       // recorro el array
       listaEstablecimientosFavoritos.forEach(establecimiento => {
        if (establecimientoFavorito.properties.friendlyurl == establecimiento.properties.friendlyurl) {
          esEncontradoEstablecimiento = true;
        }
      });
    }
    return esEncontradoEstablecimiento;
  }

  async presentarToast(messageAux: string) {
    const toast = await this.toastController.create({
      message: messageAux,
      duration: 2000,
    });
    toast.present();
  }

  // añadir un establecimiento (hotel, restaurante, alojamiento) u oferta a favoritos
  // devuelve el array del favorito que se trata
  public aniadirEstablecimientoFavorito(listaEstablecimientosFavoritos: any, 
                                        establecimientoFavorito: any, key:string): any {
    // si no es favorito lo añado
    // el array esta vacio, lo inserto
    if (!this.esFavoritoEstablecimiento(listaEstablecimientosFavoritos, establecimientoFavorito, key)) {
      listaEstablecimientosFavoritos = [...listaEstablecimientosFavoritos, establecimientoFavorito];
      this.setObject(key, listaEstablecimientosFavoritos);   
      
      // aviso (toast) de que se ha añadido a favoritos
      this.presentarToast("Establecimiento añadido a favoritos");

    }
    return listaEstablecimientosFavoritos;
  }

  // quitar un establecimiento (hotel, restaurante, alojamiento) u oferta de favoritos
  public quitarEstablecimientoFavorito(listaEstablecimientosFavoritos: any, 
                                      establecimientoFavorito: any, key:string): any {
    //compruebo que este en favoritos
    if (this.esFavoritoEstablecimiento(listaEstablecimientosFavoritos, establecimientoFavorito, key)) {
      // lo quito de favoritos
      let indice = listaEstablecimientosFavoritos.indexOf(establecimientoFavorito);
      listaEstablecimientosFavoritos = [...listaEstablecimientosFavoritos.slice(0,indice), 
                                        ...listaEstablecimientosFavoritos.slice(indice+1)];
      this.setObject(key, listaEstablecimientosFavoritos);   
      
      // aviso (toast) de que se ha añadido a favoritos
      this.presentarToast("Establecimiento eliminado de favoritos");
    }
    return listaEstablecimientosFavoritos;
  }

  // marca el restaurante como favorito y lo añade al storage
  public aniadirRestauranteFavorito (restauranteFavorito:Restaurantes) {
    this.restaurantesFavoritos = this.aniadirEstablecimientoFavorito(this.restaurantesFavoritos, 
                                                                      restauranteFavorito, this.keyRestaurantes);
  }

  public quitarRestauranteFavorito(restauranteFavorito:Restaurantes)
  {
    this.restaurantesFavoritos = this.quitarEstablecimientoFavorito(this.restaurantesFavoritos, 
      restauranteFavorito, this.keyRestaurantes);
  }

  public aniadirHotelFavorito(hotelFavorito:Hoteles)
  {
    this.hotelesFavoritos = this.aniadirEstablecimientoFavorito(this.hotelesFavoritos, 
      hotelFavorito, this.keyHoteles);
  }

  public quitarHotelFavorito(hotelFavorito: Hoteles)
  {
    this.hotelesFavoritos = this.quitarEstablecimientoFavorito(this.hotelesFavoritos, 
      hotelFavorito, this.keyHoteles);
  }

  public aniadirCasaRuralFavorito(casaRuralFavorito: CasasRurales) {
    this.casasRuralesFavoritos = this.aniadirEstablecimientoFavorito(this.casasRuralesFavoritos, 
      casaRuralFavorito, this.keyCasasRurales);
  }

  public quitarCasaRuralFavorito(casaRuralFavorito: CasasRurales) {
    this.casasRuralesFavoritos = this.quitarEstablecimientoFavorito(this.casasRuralesFavoritos, 
      casaRuralFavorito, this.keyCasasRurales);
  }

  public aniadirOfertaFavorito(ofertaFavorito:Ofertas) {
    this.ofertasFavoritos = this.aniadirEstablecimientoFavorito(this.ofertasFavoritos, 
      ofertaFavorito, this.keyOfertas);
  }

  public quitarOfertaFavorito(ofertaFavorito: Ofertas) {
    this.ofertasFavoritos = this.quitarEstablecimientoFavorito(this.ofertasFavoritos, 
      ofertaFavorito, this.keyOfertas);
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
