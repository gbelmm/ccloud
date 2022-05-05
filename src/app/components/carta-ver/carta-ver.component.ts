import { Component, Input, OnInit } from '@angular/core';
import { IonItem, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NuevaCartaComponent } from '../nueva-carta/nueva-carta.component';

@Component({
  selector: 'app-carta-ver',
  templateUrl: './carta-ver.component.html',
  styleUrls: ['./carta-ver.component.scss'],
})
export class CartaVerComponent implements OnInit {
  @Input() carta:any = null;
  @Input() mazo:any = null;
  constructor(private modalController: ModalController, private data: DataStorageService, private loadingController: LoadingController,public toastController: ToastController) { }

  ngOnInit() {}
  dismissModal(){
    this.modalController.dismiss();
  }
  imgError(e){
    this.carta.itemError = true;
    console.log(e)
  }
  async editar(item){
    const modal = await this.modalController.create({
      component: NuevaCartaComponent, 
      componentProps: { 
        mazo:this.mazo ,
        carta: this.carta,
        modo:'edit'
      },
      mode:'ios',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() 
    });
      await modal.present();
      await modal.onDidDismiss();
      this.modalController.dismiss();
      const toast = await this.toastController.create({
        message: item.name+' Editado correctamente',
        duration: 2000,
        color:'success',
        position:'top'
      });
      toast.present();
  }
  async eliminar(item){
    const loading = await this.loadingController.create({ 
      message: 'Borrando...',
      duration: 2000
    });
    await loading.present();
    await this.data.deleteCarta(item.cardId,this.mazo);
    loading.dismiss();
    this.modalController.dismiss();
    const toast = await this.toastController.create({
      message: item.name+' borrado correctamente',
      duration: 2000,
      color:'success',
      position:'top'
    });
    toast.present();
  }
}
