import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Network } from '@capacitor/network';
import { DataStorageService } from './data-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.url;
  constructor(private http: HttpClient, private data:DataStorageService) { }
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
  async getCartas(){
    let cartasStorage = await this.data.getData('mazos');
    if (cartasStorage!=null){
      return cartasStorage;
    }
    const status = await Network.getStatus();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Hos': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'f26d7ebeafmsh82d83ea989260bdp168f11jsnb5b4fb858d32'
      })
    };
    if (status.connected==true){
      let cartas =  await this.http.get(this.url+'/cards',httpOptions).toPromise();
      let cartasBD = [];
      for (let k in cartas) {
        let cartasControl = [];
        let largo = cartas[k].length<50 ? cartas[k].length : 50;
        //largo = cartas[k].length;
        //cartas repetidas? 
        console.log('grupo, ', k ,cartas[k].length, this.groupBy(cartas[k], carta => carta.name))
        for (let index = 0; index < largo; index++) {
          cartas[k][index].imagen = 'https://art.hearthstonejson.com/v1/render/latest/esES/256x/'+cartas[k][index].cardId+'.png';
          cartasControl.push(cartas[k][index]);
        }
        if (cartasControl.length==50)
        cartasBD.push({name:k, data: cartasControl})
        
      }
      await this.data.setData('mazos',cartasBD);
      return cartasBD;
    }else{
      let cartas = await this.data.getData('mazos');
      return cartas;
    }
    

  }
  async getCartasDB(){
      let cartas = await this.data.getData('mazos');
      return cartas;
  }

}
