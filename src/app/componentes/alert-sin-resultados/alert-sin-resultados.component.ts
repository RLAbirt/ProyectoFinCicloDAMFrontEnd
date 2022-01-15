import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-sin-resultados',
  templateUrl: './alert-sin-resultados.component.html',
  styleUrls: ['./alert-sin-resultados.component.scss'],
})
export class AlertSinResultadosComponent implements OnInit {

  @Input() tipo:string;

  constructor() { }

  ngOnInit() {}

}
