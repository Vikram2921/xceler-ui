import {Injectable, Type} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private static popupList: {
    id:string,
    popup: Type<HostActivity>,
    popupProp?:PopupProps,
    props?: {[key:string]:any},
    headerProp?:{[key:string]:any,show:boolean},
    footerProp?:{[key:string]:any,show:boolean}
  }[] = [];
  private static popupCloseEvent:BehaviorSubject<string> = new BehaviorSubject('');
  private static popupCloseMap:{[key:string]:Function} = {};

  static addPopup(popupId:string,popupActivity: Type<HostActivity>, props?: {[key:string]:any},headerProp?:{[key:string]:any,show:boolean},footerProp?:{[key:string]:any,show:boolean},popupProp?:PopupProps):string {
    let popupExist = this.popupList.filter(popup => popup.id === popupId).length > 0;
    if(!popupExist) {
      if(!headerProp) {
        headerProp= {show:true};
      }
      if(!footerProp) {
        footerProp ={show:true};
      }
      if(!popupProp) {
        popupProp = new PopupProps();
      }
      let obj = {
        popup: popupActivity,
        popupProp: popupProp,
        props: props,
        id:popupId,
        headerProp:headerProp,
        footerProp:footerProp
      };
      this.popupList.push(obj);
    }
    return popupId;

  }

  static getAll() {
    return this.popupList;
  }

  static removePopup(id: string) {
    this.popupList = this.popupList.filter(popup => popup.id !== id);
    if(this.popupCloseMap[id]) {
        this.popupCloseMap[id]();
    }
  }

  static addCloseEvent(id:string,callback:Function) {
    this.popupCloseMap[id] = callback;
  }

  static clearAll() {
      this.popupList = [];
  }
}

export class PopupProps {
  position: string = 'center';
  modal: boolean = true;
  closeOnModal: boolean = false;
  width: string = 'fit-content';


  constructor(position: string = 'center', modal: boolean = true, closeOnModal: boolean = false, width: string = 'fit-content') {
    this.position = position;
    this.modal = modal;
    this.closeOnModal = closeOnModal;
    this.width = width;
  }
}
