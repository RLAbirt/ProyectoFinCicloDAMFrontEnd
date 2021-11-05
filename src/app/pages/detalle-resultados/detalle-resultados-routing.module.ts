import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleResultadosPage } from './detalle-resultados.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleResultadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleResultadosPageRoutingModule {}
