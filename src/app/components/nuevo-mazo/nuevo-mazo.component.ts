import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormBuilder, FormControl , FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-nuevo-mazo',
  templateUrl: './nuevo-mazo.component.html',
  styleUrls: ['./nuevo-mazo.component.scss'],
})
export class NuevoMazoComponent implements OnInit {
  mazo: any = {};
  cartas:any = [];
  carta:any = {};
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
  ) {

   

  }
  onSubmit(){
    if (this.cartasForm.valid) {
      this.cartasForm.get('cardId').setValue('Cardid'+Math.floor(Math.random() * 9999) + 1111);
      this.cartas.push(this.cartasForm.value);
      this.carta = {}
      console.log(this.cartasForm.value);
    }

  }
  ngOnInit() {}

  dismissModal() {
    this.modal.dismiss();
  }
  async guardar() {
    this.mazo.data = this.cartas;
    const loading = await this.loadingController.create({
      message: 'Guardando',
    });
    await loading.present();
    let resp = await this.data.addMazo(this.mazo);
     
    loading.dismiss();
    const toast = await this.toastController.create({
      message: resp.msg,
      duration: 3000,
      color: resp.success ? 'success' : 'danger',
      position:'middle'
    });
    toast.present();


    if (resp.success)
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
  imgError(index,e){
    this.cartas[index].itemError = true;
    console.log(e)
  }
  addCarta(){
    this.cartas.push(this.carta);
    this.carta = {}
  }

}
