import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DetalleResultadosPage } from 'src/app/pages/detalle-resultados/detalle-resultados.page';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {

  constructor(private mdlCtrl: ModalController, public navCtrl: NavController) { }

  ngOnInit() {}

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
