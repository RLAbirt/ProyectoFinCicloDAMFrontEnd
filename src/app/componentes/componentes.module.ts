import { AlertSinResultadosComponent } from './alert-sin-resultados/alert-sin-resultados.component';
import { PipesModule } from './../pipes/pipes.module';
import { TarjetaCategoriaInicioComponent } from './tarjeta-categoria-inicio/tarjeta-categoria-inicio.component';
import { CategoriaInicioRuralesComponent } from './categoria-inicio-rurales/categoria-inicio-rurales.component';
import { CategoriaInicioRestaurantesComponent } from './categoria-inicio-restaurantes/categoria-inicio-restaurantes.component';
import { CategoriaInicioHotelesComponent } from './categoria-inicio-hoteles/categoria-inicio-hoteles.component';
import { SelectorComponent } from './selector/selector.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component'

@NgModule({
  declarations: [
    CategoriaInicioHotelesComponent,
    CategoriaInicioRestaurantesComponent,
    CategoriaInicioRuralesComponent,
    AlertSinResultadosComponent,
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
    CategoriaInicioHotelesComponent,
    CategoriaInicioRestaurantesComponent,
    CategoriaInicioRuralesComponent,
    AlertSinResultadosComponent,
    TarjetaCategoriaInicioComponent,
    DetalleComponent,
    ResultadosComponent,
    SelectorComponent
  ],
})

/** Componente que se usa para agrupar a todos los componentes */
export class ComponentesModule { }
