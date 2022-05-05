import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CartaVerComponent } from '../carta-ver/carta-ver.component';
import { CartaComponent } from '../carta/carta.component';
import { NuevaCartaComponent } from '../nueva-carta/nueva-carta.component';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.scss'],
})
export class CartasComponent implements OnInit {
  @Input() cartas:any = [];
  @Input() nombre:string;
  constructor(private modalController:ModalController, private db: DataStorageService, public loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.cartas)
  }
  dismissModal(){
    this.modalController.dismiss();
  }
  imgError(index,e){
    this.cartas[index].itemError = true;
    console.log(e)
  }
  async nuevaCarta(){
    const modal = await this.modalController.create({
      component: NuevaCartaComponent, 
      componentProps: { 
        mazo:this.nombre ,
        modo:'nuevo'
      },
      mode:'ios',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() 
    });
      await modal.present();
      await modal.onDidDismiss();
      const loading = await this.loadingController.create({
       
        message: 'Actualizando..', 
      });
      await loading.present();
      let cartas = await this.db.getMazo(this.nombre);
      this.cartas = cartas.data;
      await loading.dismiss();

  }
  async verCarta(item){
 
    const modal = await this.modalController.create({
      component: CartaVerComponent, 
      componentProps: {
        carta:item ,
        mazo:this.nombre 
      },
      mode:'ios',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() 
    });
      await modal.present();
      await modal.onDidDismiss();
      const loading = await this.loadingController.create({
       
        message: 'Actualizando..', 
      });
      await loading.present();
      let cartas = await this.db.getMazo(this.nombre);
      this.cartas = cartas.data;
      await loading.dismiss();

  }
}
