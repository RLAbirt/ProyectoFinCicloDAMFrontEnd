import { PipesModule } from './../pipes/pipes.module';
import { DistanciaPipe } from './../pipes/distancia.pipe';
import { TarjetaCategoriaInicioComponent } from './tarjeta-categoria-inicio/tarjeta-categoria-inicio.component';
import { CategoriaInicioRuralesComponent } from './categoria-inicio-rurales/categoria-inicio-rurales.component';
import { CategoriaInicioRestaurantesComponent } from './categoria-inicio-restaurantes/categoria-inicio-restaurantes.component';
import { CategoriaInicioHotelesComponent } from './categoria-inicio-hoteles/categoria-inicio-hoteles.component';
import { SelectorComponent } from './selector/selector.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaInicioComponent } from './categoria-inicio/categoria-inicio.component';
import { DetalleComponent } from './detalle/detalle.component'



@NgModule({
  declarations: [
    CategoriaInicioComponent,
    CategoriaInicioHotelesComponent,
    CategoriaInicioRestaurantesComponent,
    CategoriaInicioRuralesComponent,
    TarjetaCategoriaInicioComponent,
    DetalleComponent,
    ResultadosComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    CategoriaInicioComponent,
    CategoriaInicioHotelesComponent,
    CategoriaInicioRestaurantesComponent,
    CategoriaInicioRuralesComponent,
    TarjetaCategoriaInicioComponent,
    DetalleComponent,
    ResultadosComponent,
    SelectorComponent
  ],
})
export class ComponentesModule { }
