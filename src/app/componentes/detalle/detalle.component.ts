import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})

// cristina: componente para mostrar el detalle de un hotel/restaurante/alojamiento/oferta

export class DetalleComponent implements OnInit {
  @Input() municipio: string;
  @Input() territorio: string;
  @Input() nombre: string;
  @Input() descripcion: string;
  @Input() web: string;
  
  constructor() { }

  ngOnInit() {}

}
