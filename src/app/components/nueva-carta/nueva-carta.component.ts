import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormBuilder, FormControl , FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-nueva-carta',
  templateUrl: './nueva-carta.component.html',
  styleUrls: ['./nueva-carta.component.scss'],
})
export class NuevaCartaComponent implements OnInit {
  @Input() modo:any = '';
  @Input() mazo:any = '';
  @Input() carta:any = {};
  cartasForm = this.fb.group({
    name: ['', Validators.required],
    health: ['', Validators.required],
    cost: ['', Validators.required],
    attack: ['', Validators.required],
    text: [''],
    cardId: [''],
    imagen: [],
    imagenB64: [],
  });
  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    public loadingController: LoadingController,
    private data: DataStorageService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
   if (this.carta.cardId){
    this.cartasForm = this.fb.group({
      name: [this.carta.name, Validators.required],
      health: [this.carta.health, Validators.required],
      cost: [this.carta.cost, Validators.required],
      attack: [this.carta.attack, Validators.required],
      text: [this.carta.text],
      cardId: [this.carta.cardId],
      imagen: [this.carta.imagen],
      imagenB64: [],
    });
   }
  }
  dismissModal(){
    this.modal.dismiss();
  }
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.cartasForm.get('imagenB64').setValue(reader.result);
        
    };
  }
 async  onSubmit(){
  console.log(this.cartasForm.value);
    if (this.cartasForm.valid) {
      if (this.modo=='nuevo'){
        this.cartasForm.get('cardId').setValue('Cardid'+Math.floor(Math.random() * 9999) + 1111);
        await this.data.addCarta(this.cartasForm.value,this.mazo)
      }else{
        console.log('edit', this.carta)
        await this.data.editCarta(this.cartasForm.value,this.mazo)
      }
      
     
      this.carta = {}
      console.log(this.cartasForm.value);
      this.modal.dismiss();
    }

  }
}
