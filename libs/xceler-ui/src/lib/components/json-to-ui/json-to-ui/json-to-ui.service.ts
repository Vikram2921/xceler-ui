import {Injectable} from '@angular/core';
import {JSONToUIComponent} from "@xceler-ui/xceler-ui";

@Injectable({
  providedIn: 'root'
})
export class JsonToUIService {
  private static map: { [key: string]: JSONToUIComponent } = {};
  private static states:{[key:string]:any} = {};


  static saveState(key:string,state:any){
    this.states[key] = state;
  }

  static getState(key:string,deleteState:boolean = true){
    let state = Object.assign({},this.states[key]);
    if(deleteState) {
      delete this.states[key];
    }
    return state;
  }


  static add(key: string, component: JSONToUIComponent) {
    this.map[key] = component;
  }

  static get(key: string) {
    return this.map[key];
  }


  static getAll() {
    return this.map;
  }


  static remove(key: string) {

    delete this.map[key];
  }

  static removeAll() {
    this.map = {};
  }

}
