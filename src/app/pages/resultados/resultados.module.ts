import { DetalleResultadosPageModule } from './../detalle-resultados/detalle-resultados.module';
import { DetalleComponent } from './../../componentes/detalle/detalle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadosPageRoutingModule } from './resultados-routing.module';

import { ResultadosPage } from './resultados.page';

import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  entryComponents:[
    DetalleResultadosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    ResultadosPageRoutingModule,
    DetalleResultadosPageModule
  ],
  declarations: [ResultadosPage]
})
export class ResultadosPageModule {}
