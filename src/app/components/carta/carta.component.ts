import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'],
})
export class CartaComponent implements OnInit {
  @Input() carta:any = null;
  @Input() mode:string = null;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  dismissModal(){
    this.modalController.dismiss();
  }
  imgError(e){
    this.carta.itemError = true;
    console.log(e)
  }
}
