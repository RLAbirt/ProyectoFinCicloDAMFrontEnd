import {Restaurantes, Hoteles, CasasRurales, Ofertas} from './../../interfaces/bertoninterfaces';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import * as Constants from '../../constants/constants';
import { DetalleResultadosPage } from '../detalle-resultados/detalle-resultados.page';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})

/**
 * Pagina que muestra los favoritos de toda la app 
 * se puede ver en detalle un favorito concreto o borrarlo 
 */
export class FavoritosPage implements OnInit {
  public avatarHotel = Constants.AVA_HOTEL;
  public avatarRestaurante = Constants.AVA_RESTAURANT;
  public avatarCasaRural = Constants.AVA_RURAL;
  public avatarOferta = Constants.AVA_OFERTA;

  constructor(
    public storageService: StorageService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  /**
   * Abre la modal para mostrar el detalle del establecimiento que no sea de ofertas
   * seleccionado.
   * @param item
   */
  async abrirModalNoOfertas(item: any, clase: string) {
    const modal = await this.modalController.create({
      component: DetalleResultadosPage,
      componentProps: {
        municipio: item.properties.municipality,
        territorio: item.properties.territory,
        nombre: item.properties.documentname,
        descripcion: item.properties.turismdescription,
        web: item.properties.web,
        clase: clase,
      },
    });
    await modal.present();
  }

  /**
   * Abre la modal para mostrar el detalle de una oferta
   * seleccionado.
   * @param item
   */
  async abrirModalOfertas(item: any) {
    const modal = await this.modalController.create({
      component: DetalleResultadosPage,
      componentProps: {
        municipio: item.properties.municipality,
        territorio: item.properties.territory,
        nombre: item.properties.documentname,
        descripcion: item.properties.documentdescription,
        web: item.properties.friendlyurl,
        clase: 'ofertas',
      },
    });
    await modal.present();
  }

  /**
   * quitar de favoritos un hotel
   */
  public quitarFavoritoHotel(hotelAux: Hoteles): void {
    this.storageService.quitarHotelFavorito(hotelAux);
  }

  /**
   * quitar de favoritos un restaurante
   */
  public quitarFavoritoRestaurante(restauranteAux: Restaurantes): void {
    this.storageService.quitarRestauranteFavorito(restauranteAux);
  }

  /**
   * quitar de favoritos una casa rural
   */
  public quitarFavoritoCasasRurales(casaRuralAux: CasasRurales): void {
    this.storageService.quitarCasaRuralFavorito(casaRuralAux);
  }

  /**
   * quitar de favoritos un restaurante
   */
  public quitarFavoritoOferta(ofertaAux: Ofertas): void {
    this.storageService.quitarOfertaFavorito(ofertaAux);
  }
}
