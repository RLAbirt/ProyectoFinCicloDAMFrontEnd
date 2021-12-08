import { Component, Input, OnInit } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-categoria-inicio',
  templateUrl: './categoria-inicio.component.html',
  styleUrls: ['./categoria-inicio.component.scss'],
  providers: [HttpService],
})
export class CategoriaInicioComponent implements OnInit {


  @Input() titulo: string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  establecimientos: string[] = ['',''];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  @Input() hoteles: Hoteles;
           casasrurales: CasasRurales;
           restaurantes: Restaurantes; 



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
