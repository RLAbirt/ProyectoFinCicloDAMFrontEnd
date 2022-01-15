import { NavController, ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import {
  Hoteles,
  Restaurantes,
  CasasRurales,
  Ofertas,
} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import * as Constants from '../../constants/constants';
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
  providers: [HttpService],
})

/** Componente para mostrar los diferentes resultados de un establecimiento  */
export class ResultadosComponent implements OnInit {
  @Input() clase: string;
  @Input() distSelect: number;
  listado: any[] = [];
  lon: number;
  lat: number;
  tipo: string;
  seleccion: any;
  image: any;
  isLoading:boolean = false;

  constructor(
    public navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    private httpService: HttpService,
    public storageService: StorageService,
    private geoService: GeolocationService,
    private modalController: ModalController
  ) {}

  /**
   * funcion que al cargar el componente actualiza la geolocalización y despues carga la pagina de resultados
   * distSelect indica el numero de resultados a mostrar
   */
  ngOnInit() {
    this.geoService.actualizarPosicion().then(() => {
      this.lat = this.geoService.getLatitude();
      this.lon = this.geoService.getLongitude();

      this.distSelect = 20;

      this.loadPage();
    });
  }

  /**
   * Carga la información a mostrar dependiendo
   * del tipo de establecimiento.
   */
  private loadPage() {
    this.listado = [];
    this.isLoading = true;
    if (this.clase == 'hoteles') {
      this.httpService
        .getByGeoHoteles(this.lon, this.lat, this.distSelect)
        .subscribe((resp) => {
          this.image = Constants.AVA_HOTEL;
          this.listado = <Hoteles[]>resp;
          this.isLoading = false;
        });
    } else if (this.clase == 'casas rurales') {
      this.httpService
        .getByGeoCasasRurales(
          this.lon,
          this.lat,
          this.distSelect,
          Constants.CASA_RURAL_TYPE
        )
        .subscribe((resp) => {
          this.image = Constants.AVA_RURAL;
          this.listado = <CasasRurales[]>resp;
          this.isLoading = false;
        });
    } else if (this.clase == 'restaurantes') {
      this.httpService
        .getByGeoRestaurantes(this.lon, this.lat, this.distSelect)
        .subscribe((resp) => {
          this.image = Constants.AVA_RESTAURANT;
          this.listado = <Restaurantes[]>resp;
          this.isLoading = false;
        });
    } else if (this.clase == 'ofertas') {
      this.httpService.getAllOfertas().subscribe((resp) => {
        this.image = Constants.AVA_OFERTA;
        this.listado = <Ofertas[]>resp;
        this.isLoading = false;
      });
    }
  }

  /**
   * Llama a cargar la página cuando se active el
   * detector de cambios.
   */
  ngOnChanges() {
    if (this.lon !== undefined && this.lat !== undefined) {
      this.loadPage();
    }
  }

  /**
   * Abre la modal para mostrar el detalle del establecimiento
   * seleccionado.
   * @param item
   */
  async abrirModal(item: any) {
    if (this.clase === 'ofertas') {
      const modal = await this.modalController.create({
        component: DetalleResultadosPage,
        componentProps: {
          municipio: item.properties.municipality,
          territorio: item.properties.territory,
          nombre: item.properties.documentname,
          descripcion: item.properties.documentdescription,
          web: item.properties.friendlyurl,
          clase: this.clase,
        },
      });
      await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: DetalleResultadosPage,
        componentProps: {
          municipio: item.properties.municipality,
          territorio: item.properties.territory,
          nombre: item.properties.documentname,
          descripcion: item.properties.turismdescription,
          web: item.properties.web,
          clase: this.clase,
        },
      });
      await modal.present();
    }
  }

  /**
   * Función que nos indica si un establecimiento/oferta es favorito o no.
   * Devuelve un booleano.
   * True si esta en favoritos el establecimiento, false en caso contrario.
   */
  public esFavorito(item: any): boolean {
    let indiceAux: number = -1;

    switch (this.clase) {
      case 'restaurantes':
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.restaurantesFavoritos,
          item,
          this.storageService.keyRestaurantes
        );
        break;
      case 'hoteles':
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.hotelesFavoritos,
          item,
          this.storageService.keyHoteles
        );
        break;
      case 'casas rurales':
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.casasRuralesFavoritos,
          item,
          this.storageService.keyCasasRurales
        );
        break;
      case 'ofertas':
        indiceAux = this.storageService.esFavoritoEstablecimiento(
          this.storageService.ofertasFavoritos,
          item,
          this.storageService.keyOfertas
        );
        break;
      default:
        console.log('Error desconocido en Berton');
    }
    return indiceAux != -1;
  }

  /**
   * Función quita de favoritos un establecimiento u oferta
   */
  quitarFavoritos(item: any) {
    let indice: number = -1;

    // this.clase: restaurantes, hoteles, alojamientos, ofertas
    switch (this.clase) {
      case 'restaurantes':
        this.storageService.quitarRestauranteFavorito(item);
        break;
      case 'hoteles':
        this.storageService.quitarHotelFavorito(item);
        break;
      case 'casas rurales':
        this.storageService.quitarCasaRuralFavorito(item);
        break;
      case 'ofertas':
        this.storageService.quitarOfertaFavorito(item);
        break;
      default:
        console.log('Error desconocido en Berton');
    }
  }

  /**
   * Función que añade de favoritos un establecimiento u oferta
   */
  anadirFavoritos(item: any) {
    // this.clase: restaurantes, hoteles, alojamientos, ofertas
    switch (this.clase) {
      case 'restaurantes':
        this.storageService.aniadirRestauranteFavorito(item);
        break;
      case 'hoteles':
        this.storageService.aniadirHotelFavorito(item);
        break;
      case 'casas rurales':
        this.storageService.aniadirCasaRuralFavorito(item);
        break;
      case 'ofertas':
        this.storageService.aniadirOfertaFavorito(item);
        break;
      default:
        console.log('Error desconocido en Berton');
    }
  }
}
