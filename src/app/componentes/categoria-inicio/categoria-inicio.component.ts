import { Component, Input, OnInit } from '@angular/core';
import { Establecimiento } from 'src/app/models/InterfacesMock.interface';

@Component({
  selector: 'app-categoria-inicio',
  templateUrl: './categoria-inicio.component.html',
  styleUrls: ['./categoria-inicio.component.scss'],
})
export class CategoriaInicioComponent implements OnInit {

  @Input() titulo: string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  establecimientos: string[] = ['',''];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  @Input() hoteles: Establecimiento[]= [];



  constructor() { }

  ngOnInit() {
    console.log(this.hoteles)
  }
}
