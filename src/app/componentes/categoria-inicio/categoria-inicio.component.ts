import { Restaurante } from './../../models/Restaurante';
import { CasaRural } from './../../models/CasaRural';
import { Component, Input, OnInit } from '@angular/core';
import { Establecimiento } from 'src/app/models/InterfacesMock.interface';
import { Hotel } from 'src/app/models/Hotel';
import { HttpService } from 'src/app/services/http.service';

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

  @Input() hoteles: Hotel[]= [];
           casasrurales: CasaRural[] = [];
           restaurantes: Restaurante[] = []; 



  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getSliceHoteles()
      .subscribe(resp => {
        console.log(resp);
        this.hoteles = resp;
      })
    console.log(this.hoteles)

    this.httpService.getSliceCasasRurales()
      .subscribe(resp => {
        console.log(resp);
        this.casasrurales = resp;
      })
    console.log(this.casasrurales)

    this.httpService.getSliceRestaurantes()
      .subscribe(resp => {
        console.log(resp);
        this.restaurantes = resp;
      })
    console.log(this.restaurantes)
  }
}
