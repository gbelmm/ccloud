import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartasPageRoutingModule } from './cartas-routing.module';

import { CartasPage } from './cartas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CartasPage]
})
export class CartasPageModule {}
