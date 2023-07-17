import { Injectable } from '@angular/core';
import {ListOption} from "../form-controls/core/list-option";

export class Store {
  listValues: {[key: string]: ListOption[]} = {};
  data:any
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private static stores: {[key: string]: Store} = {};

  static addStore(store: string) {
    if(this.stores[store])
        return;
    this.stores[store] = new Store();
  }

  static addListValues(store: string, key: string, value: ListOption[]) {
    this.stores[store].listValues[key] = value;
  }


  static getListValues(store: string, key: string,def?:ListOption[]):ListOption[] {
    if(key?.startsWith("common_")) {
      store = "common";
    }
    return this.stores[store].listValues[key]??def??[new ListOption()];
  }
  static getStore(store: string) {
    return this.stores[store];
  }



}

