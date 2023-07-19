import { Injectable } from '@angular/core';
import {FunctionParams} from "../models/function-params";

@Injectable({
  providedIn: 'root'
})
export class FunctionRegister {
  private static functionFiles:Map<string,{[key:string]:Function}> = new Map<string, {[key:string]:Function}> ();

  static registerFunctionsFile(name:string,file:{[key:string]:Function}) {
    this.functionFiles.set(name,file);
  }

  static callFunction(fileName:string,functionName:string,params:FunctionParams | {[key:string]:any}) {
    if(this.functionFiles.has(fileName)) {
      let file = this.functionFiles.get(fileName);
      if(file !== null && file !== undefined) {
        file[functionName](params);
      }
    }
  }

  static getFunction(fileName:string,functionName:string) {
    if(this.functionFiles.has(fileName)) {
      let file = this.functionFiles.get(fileName);
      if(file !== null && file !== undefined) {
        return file[functionName]
      }
    }
    return null;
  }

  static hasFunction(fileName:string,functionName:string) {
    if(this.functionFiles.has(fileName)) {
      let file = this.functionFiles.get(fileName);
      if(file && file[functionName]) {
          return true;
      }
    }
    return false;
  }
}
