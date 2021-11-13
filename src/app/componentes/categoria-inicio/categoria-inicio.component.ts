import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-inicio',
  templateUrl: './categoria-inicio.component.html',
  styleUrls: ['./categoria-inicio.component.scss'],
})
export class CategoriaInicioComponent implements OnInit {

  @Input() titulo:string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  establecimientos: string[] = ['',''];

  constructor() { }

  ngOnInit() {}

}
