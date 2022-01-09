import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})

/** Pagina que va a mostrar los resultados de los establecimientos/ofertas */
export class ResultadosPage implements OnInit {

  clase: string ="";
  distancia: number = 0;

  constructor( private activatedRoute:ActivatedRoute ) { }

  // obtenemos de que tipo de establecimiento se trata
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.clase =  params['clase'];
      });
  }

  // obtenemos la distancia (rango de kms en los que buscar un establecimiento)
  getDistancia( event:CustomEvent ) {
    console.log('evento',event);
    this.distancia = event.detail.value;
    console.log(this.distancia);
  }

}
