import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Establecimiento } from 'src/app/models/InterfacesMock.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categorias: string[] = ['Hoteles', 'Restaurantes', 'Casas Rurales'];

  hoteles: Establecimiento[] = [];

  constructor(private httpService:HttpService) {}

  ngOnInit(): void {
    this.httpService.getSliceHoteles()
      .subscribe( resp => {
        console.log(resp);
        this.hoteles = resp;
      })
  }

  

}
