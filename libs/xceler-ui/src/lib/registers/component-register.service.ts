import {Injectable, Type} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HostActivity} from "../models/host-activity";

@Injectable({
  providedIn: 'root'
})
export class ComponentRegister {
  private static componentMap:Map<string,Type<HostActivity>> = new Map<string, Type<HostActivity>> ();
  private static elementMap = new BehaviorSubject({});
  private static elements:Map<string,{activity:any,props:{[key:string]:any}}> = new Map<string, {activity: any; props: {[p: string]: any}}>()
  static registerComponent(name:string,component:Type<HostActivity>) {
    this.componentMap.set(name,component);
  }

  static getComponent(name:string) {
    let template = this.componentMap.get(name);
    if(template != undefined) {
      return template;
    } else {
      throw new Error("Template not found for name "+ name);
    }
  }

  static registerElement(name:string,element:any,props:{[key:string]:any}) {
    this.elements.set(name,{activity:element,props:props});
    this.elementMap.next({"name":name,"element":element});
  }

  static getElementMap()  {
    return this.elementMap;
  }

  static getElement(name:string):{activity:any,props:{[key:string]:any}} {
      let element = this.elements.get(name);
      if(element != undefined) {
          return element;
      } else {
          throw new Error("Element not found for name "+ name);
      }
  }
}
