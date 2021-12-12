import { DistanciaPipe } from './distancia.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DistanciaPipe],
  imports: [
    CommonModule
  ],
  exports: [DistanciaPipe]
})
export class PipesModule { }
