import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-resultados',
  templateUrl: './detalle-resultados.page.html',
  styleUrls: ['./detalle-resultados.page.scss'],
})

/** Pagina donde muestra en detalle un establecimiento/oferta */
export class DetalleResultadosPage implements OnInit {

  @Input() clase:string = "";
  @Input() municipio:string = "";
  @Input() territorio:string = "";
  @Input() nombre:string = "";
  @Input() descripcion:string = "";
  @Input() web:string = "";

  constructor( private modalController:ModalController ) { }

  ngOnInit() {
  }

  // para cerrar la modal
  dismiss() {
    this.modalController.dismiss();
  }

}
