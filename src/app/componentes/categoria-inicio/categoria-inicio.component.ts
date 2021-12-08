import { Component, Input, OnInit } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { HttpService } from 'src/app/services/http.service';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-inicio',
  templateUrl: './categoria-inicio.component.html',
  styleUrls: ['./categoria-inicio.component.scss'],
})
export class CategoriaInicioComponent implements OnInit {

  @Input() titulo: string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  establecimientos: any[] = ['',''];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  @Input() hoteles: Hoteles[]= [];
  @Input() casasRurales: CasasRurales[] = [];
  @Input() restaurantes: Restaurantes[] = []; 

  establecimiento:String = "";
  enlace:String="";



  constructor(private httpService: HttpService, private router:Router) { }

  ngOnInit() {
    switch(this.titulo) {
      case "Hoteles":
        this.establecimiento = "Hotel";
        this.establecimientos = this.hoteles;
        break;
      case "Restaurantes":
        this.establecimiento = "Restaurante";
        this.establecimientos = this.restaurantes;
        break;
      case "Casas Rurales":
        this.establecimiento = "Casa Rural";
        this.establecimientos = this.casasRurales;
        break;
    }
    
  }

  /**
   * Abre la página detalle del establecimiento seleccionado
   * @param index 
   */
  abreDetalle( index ) {
    let navExtras:NavigationExtras = {
      queryParams: {
        establecimiento: this.establecimientos[index]
      }
    }

    this.router.navigate(['/detalle-resultados'], navExtras);
  }

  /**
   * Abre la página de resultados del tipo de establecimiento seleccionado
   */
  abreResultado() {
    let navExtras:NavigationExtras = {
      queryParams: {
        tipo: this.establecimiento
      }
    }
    this.router.navigate(['/resultados'], navExtras);
  }
}
