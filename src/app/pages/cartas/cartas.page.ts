import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevoMazoComponent } from 'src/app/components/nuevo-mazo/nuevo-mazo.component';
import { ApiService } from 'src/app/services/api.service';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
})
export class CartasPage implements OnInit {
  mazos:any = [];
  constructor(private api: ApiService,private modalController: ModalController,private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
   
    
    this.loadMazos();
   
     
  }

  async loadMazos(){
    this.mazos = await this.api.getCartas();
  }
  async nuevoMazo(){
    const modal = await this.modalController.create({
      component: NuevoMazoComponent, 
      mode:'ios',
      swipeToClose: true, 
      presentingElement: this.routerOutlet.nativeEl 
    });
     await modal.present();
     await modal.onDidDismiss();
     this.loadMazos();
  }
}
