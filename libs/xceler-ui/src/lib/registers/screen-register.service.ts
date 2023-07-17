import { Injectable } from '@angular/core';
import {Activity} from "../interfaces/activity";

@Injectable({
  providedIn: 'root'
})
export class ScreenRegister {

  private static screenMap:Map<string,Activity> = new Map<string, Activity> ();

  static addScreen(name:string,activity:Activity) {
    this.screenMap.set(name,activity);
  }

  static getScreen(name:string) {
    let activity = this.screenMap.get(name);
    if(activity != undefined) {
      return activity;
    } else {
      throw new Error("Activity not found for name "+ name);
    }
  }
}
