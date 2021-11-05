import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleResultadosPageRoutingModule } from './detalle-resultados-routing.module';

import { DetalleResultadosPage } from './detalle-resultados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleResultadosPageRoutingModule
  ],
  declarations: [DetalleResultadosPage]
})
export class DetalleResultadosPageModule {}
