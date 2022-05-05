import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CartasComponent } from '../cartas/cartas.component';

@Component({
  selector: 'app-mazos',
  templateUrl: './mazos.component.html',
  styleUrls: ['./mazos.component.scss'],
})
export class MazosComponent implements OnInit {
  @Input() mazos:any = [];
  constructor(private modalController:ModalController, private db:DataStorageService) { }

  ngOnInit() {
    console.log(this.mazos)
    
  }
   
  async verCartas(items){
    console.log(items)
    const modal = await this.modalController.create({
      component: CartasComponent, 
      componentProps: {
        cartas:items.data,
        nombre:items.name
      }
    });
    return await modal.present();

  }

}
