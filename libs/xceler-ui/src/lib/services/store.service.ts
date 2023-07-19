import { Injectable } from '@angular/core';
import {ListOption} from "../components/form-controls/core/list-option";
import {BehaviorSubject} from "rxjs";

export class Store {
  listValues: {[key: string]: ListOption[]} = {};
  data:any
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private static storeObserver = new BehaviorSubject({});
  private static stores: {[key: string]: Store} = {};

  static addStore(store: string) {
    if(this.stores[store])
        return;
    this.stores[store] = new Store();
  }

  static addListValues(store: string, key: string, value: ListOption[]) {
    this.stores[store].listValues[key] = value;
    this.storeObserver.next({store:store,key:key,value:value});
  }

  static getObserver() {
      return this.storeObserver;
  }

  static getListValues(store: string, key?: string,defaultList?:ListOption[]) {
    if(key?.startsWith("common_")) {
      store = "common";
    }
    if(key && key.length > 0 && this.stores[store]) {
      let list = this.stores[store].listValues[key];
      if(list && list.length > 0) {
        return list;
      }
    }
    return (defaultList && defaultList.length > 0)?defaultList:[new ListOption()];
  }
  static getStore(store: string) {
    return this.stores[store];
  }



}

