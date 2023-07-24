import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PubSubService {

  private static observerMap:{[key:string]:BehaviorSubject<any>}= {};
  getSubscriber(key:string){
    return PubSubService.observerMap[key];
  }

  addSubscriber(key:string,subscriber:BehaviorSubject<any>){
    PubSubService.observerMap[key]=subscriber;
  }
}
