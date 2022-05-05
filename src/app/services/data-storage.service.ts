import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setData(key, value) {
    this._storage?.set(key, value);
  }

  async getData(key) {
    return await this._storage?.get(key);
  }
  async addMazo(mazo) {
    let mazos = await this._storage?.get('mazos');
    var index = mazos
      .map((o) => {
        return o.name;
      })
      .indexOf(mazo.name);
    if (index != -1) {
      return { success: false, msg: 'Ya existe un mazo con este nombre' };
    } else {
      mazos.push(mazo);
      this._storage?.set('mazos', mazos);
      return { success: true, msg: 'Mazo guardado correctamente' };
    }
    return index;
  }
  async getMazo(key) {
    let mazos = await this._storage?.get('mazos');
    var index = mazos
      .map((o) => {
        return o.name;
      })
      .indexOf(key);
    return mazos[index];
  }
  async deleteCarta(id, mazo) {
    let mazos = await this._storage?.get('mazos');
    var index = mazos
      .map((o) => {
        return o.name;
      })
      .indexOf(mazo);
    if (index != -1) {
      for (let index2 = 0; index2 < mazos[index].data.length; index2++) {
        if (mazos[index].data[index2].cardId == id) {
          mazos[index].data.splice(index2, 1);
        }
      }

      this._storage?.set('mazos', mazos);
      return { success: true, msg: 'Ya existe un mazo con este nombre' };
    } else {
      return { success: false, msg: 'Ya existe un mazo con este nombre' };
    }
  }
  async addCarta(carta, mazo) {
    let mazos = await this._storage?.get('mazos');
    var index = mazos
      .map((o) => {
        return o.name;
      })
      .indexOf(mazo);
    if (index != -1) {
      if (carta.imagenB64){
        carta.imagen = carta.imagenB64;
        delete carta.imagenB64;
      }
      mazos[index].data.push(carta);

      await this._storage?.set('mazos', mazos);
      return { success: true, msg: 'Carta guardada correctamente' };
    } else {
      return { success: false, msg: 'No existe carta' };
    }
  }
  async editCarta(carta, mazo) {
    let mazos = await this._storage?.get('mazos');
    var index = mazos
      .map((o) => {
        return o.name;
      })
      .indexOf(mazo);
    if (index != -1) {
      for (let index2 = 0; index2 < mazos[index].data.length; index2++) {
        if (mazos[index].data[index2].cardId == carta.cardId) {

          if (carta.imagenB64){
            carta.imagen = carta.imagenB64;
            delete carta.imagenB64;
          }

          mazos[index].data[index2] = carta;
        }
      }

      await this._storage?.set('mazos', mazos);
      return { success: true, msg: 'Carta guardada correctamente' };
    } else {
      return { success: false, msg: 'No existe carta' };
    }
  }
}
