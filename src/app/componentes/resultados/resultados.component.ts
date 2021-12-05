import { ModalController, NavController } from '@ionic/angular';
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';
import { HttpService } from 'src/app/services/http.service';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados-list',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {

  @Input() hoteles: Hoteles[]= [];
           casasrurales: CasasRurales[] = [];
           restaurantes: Restaurantes[] = []; 
           ofertas: Ofertas[] = [];
           distancia: number = 1;
           lon: number;
           lat: number;
           tipo: string;

  constructor(private mdlCtrl: ModalController, public navCtrl: NavController, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getByGeoHoteles(this.lon,this.lat,this.distancia)
      .subscribe(resp => {
        console.log(resp);
        this.hoteles = resp;
      })
    console.log(this.hoteles)

    this.httpService.getByGeoCasasRurales(this.lon,this.lat,this.distancia, this.tipo)
      .subscribe(resp => {
        console.log(resp);
        this.casasrurales = resp;
      })
    console.log(this.casasrurales)

    this.httpService.getByGeoRestaurantes(this.lon,this.lat,this.distancia)
      .subscribe(resp => {
        console.log(resp);
        this.restaurantes = resp;
      })
    console.log(this.restaurantes)

    this.httpService.getAllOfertas()
      .subscribe(resp => {
        console.log(resp);
        this.ofertas = resp;
      })
    console.log(this.ofertas)
  }

  async abrirModal(){
    const modal = await this.mdlCtrl.create({
      component: DetalleResultadosPage,
      cssClass: 'my-custom-class',
      componentProps: {
      'firstName': 'Douglas',
      'lastName': 'Adams',
      'middleInitial': 'N'
      }
    });

    await modal.present();
  }
}
