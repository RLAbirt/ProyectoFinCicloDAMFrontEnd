import { SelectorComponent } from './selector/selector.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaInicioComponent } from './categoria-inicio/categoria-inicio.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { DetalleComponent } from './detalle/detalle.component'



@NgModule({
  declarations: [
    CategoriaInicioComponent,
    MenuLateralComponent,
    DetalleComponent,
    ResultadosComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CategoriaInicioComponent,
    MenuLateralComponent,
    DetalleComponent,
    ResultadosComponent,
    SelectorComponent
  ]
})
export class ComponentesModule { }
