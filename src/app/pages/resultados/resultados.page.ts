import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  clase: string ="";
  distancia: number = 0;

  constructor( private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.clase =  params['clase'];
        console.log(this.clase);
      });
  }

  getDistancia( event:CustomEvent ) {
    console.log('evento',event);
    this.distancia = event.detail.value;
    console.log(this.distancia);
  }

}
