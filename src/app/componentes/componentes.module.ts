import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaInicioComponent } from './categoria-inicio/categoria-inicio.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';



@NgModule({
  declarations: [
    CategoriaInicioComponent,
    MenuLateralComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CategoriaInicioComponent,
    MenuLateralComponent
  ]
})
export class ComponentesModule { }
