import {Injectable, Type} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {HostActivity} from "../models/host-activity";

@Injectable({
  providedIn: 'root'
})
export class ComponentRegister {
  private static componentMap:Map<string,Type<HostActivity>> = new Map<string, Type<HostActivity>> ();
  private static elementMap = new BehaviorSubject({});
  private static elements:Map<string,{component:any,props:{[key:string]:any}}> = new Map<string, {component: any; props: {[p: string]: any}}>()
  private static subscription?:Subscription;
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
    this.elements.set(name,{component:element,props:props});
    this.elementMap.next({"name":name,"element":element});
  }

  static getElementMap()  {
    return this.elementMap;
  }

  static unsubscribeAll() {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }

  static setCurrentSubscription(subscription:Subscription) {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = subscription;
  }

  static getElement(name:string):{component:any,props:{[key:string]:any}} {
      let element = this.elements.get(name);
      if(element != undefined) {
          return element;
      } else {
          throw new Error("Element not found for name "+ name);
      }
  }
}
