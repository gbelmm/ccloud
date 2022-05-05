import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartaVerComponent } from './carta-ver/carta-ver.component';
import { CartaComponent } from './carta/carta.component';
import { CartasComponent } from './cartas/cartas.component';
import { MazosComponent } from './mazos/mazos.component';
import { NuevoMazoComponent } from './nuevo-mazo/nuevo-mazo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NuevaCartaComponent } from './nueva-carta/nueva-carta.component';
@NgModule({
  declarations: [
    CartasComponent,
    MazosComponent,
    CartaComponent,
    NuevoMazoComponent,
    CartaVerComponent,
    NuevaCartaComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [
    CartasComponent,
    MazosComponent,
    CartaComponent,
    NuevoMazoComponent,
    CartaVerComponent,
    NuevaCartaComponent
  ],
})
export class ComponentsModule {}
