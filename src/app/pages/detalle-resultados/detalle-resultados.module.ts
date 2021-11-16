import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleResultadosPageRoutingModule } from './detalle-resultados-routing.module';

import { DetalleResultadosPage } from './detalle-resultados.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    DetalleResultadosPageRoutingModule
  ],
  declarations: [DetalleResultadosPage]
})
export class DetalleResultadosPageModule {}
