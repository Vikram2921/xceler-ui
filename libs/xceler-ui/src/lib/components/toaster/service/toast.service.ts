import {Injectable} from '@angular/core';
import {ToastMessageModel} from "../model/ToastMessageModel";
import {ToastMessageType} from "../model/ToastMessageType";
import { Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private static position = 'right';

  private static customTypes:{[key:string]:ToastMessageType} = {};
  private static messages:ToastMessageModel[] =[];

  private static  _messageUpdater = new ReplaySubject<ToastMessageModel>();

  private static registerDefaultTypes() {
    ToastService.registerType('info','fas fa-info-circle','#0000FF7F')
    ToastService.registerType('success','fas fa-check','#0080007F')
    ToastService.registerType('warn','fas fa-exclamation-circle','#FFA500FF')
    ToastService.registerType('error','fas fa-times-circle','#FF00007F')
    ToastService.registerType('confirm','fas fa-times-circle','#0080007F')
  }

  static registerType(name:string,icon:string,color:string) {
    ToastService.customTypes[name]=new ToastMessageType(name,color,icon);
  }

  static addMessage(heading:string|null,message:string| null,severity = 'info',autoHide = true,delayInMs = 5000,position = 'right',props?:{[key:string]:any}) {
    const toast = new ToastMessageModel(message,heading,severity,autoHide,delayInMs,position,props);
    this.messages.push(toast);
    this.position = position;
    this._messageUpdater.next(toast);
    return toast;
  }

  static getPosition():string {
    return this.position;
  }


  static addSuccessMessage(heading:string | null,message:string  | null,autoHide = true,delayInMs = 5000,position = 'right',props?:{[key:string]:any}) {
    this.addMessage(heading,message,'success',autoHide,delayInMs,position,props);
  }
  static addConfirmationMessage(heading:string | null,message:string | null, autoHide = true,delayInMs = 5000,position = 'center',props?:{buttons:any[],onClickButton:Function}) {
    this.addMessage(heading,message,'confirm',autoHide,delayInMs,position,props);
  }

  static addInfoMessage(heading:string | null,message:string | null,autoHide = true,delayInMs = 5000,position = 'right',props?:{[key:string]:any}) {
    this.addMessage(heading,message,'info',autoHide,delayInMs,position,props);
  }

  static addHtmlTemplate(template:string,autoHide = true,delayInMs = 5000,position = 'right',props?:{[key:string]:any}) {
    this.addMessage(null,template,'html',autoHide,delayInMs,position,props);
  }

  static addWarningMessage(heading:string | null,message:string | null,autoHide = true,delayInMs = 5000,position = 'right',props?:{[key:string]:any}) {
    this.addMessage(heading,message,'warn',autoHide,delayInMs,position,props);
  }

  static addErrorMessage(heading:string | null,message:string | null,autoHide = true,delayInMs = 5000,position = 'right',props?:{[key:string]:any}) {
    this.addMessage(heading,message,'error',autoHide,delayInMs,position,props);
  }

  static showLoadingPopup(message:string| null,props?:{path:string,width:number,height:number},autoHide = false,delayInMs = 5000,position = 'right') {
    return this.addMessage(null,message,'loading',autoHide,delayInMs,position,props);
  }

  static deleteMessage(toastMessage:ToastMessageModel) {
    ToastService.messages.splice(this.messages.indexOf(toastMessage),1);
  }

  static getAllMessages():ToastMessageModel[] {
    return ToastService.messages;
  }

  static getUpdater():Observable<ToastMessageModel> {
    return this._messageUpdater.asObservable();
  }

  static getType(type:string) {
    if(Object.keys(this.customTypes).length == 0) {
      this.registerDefaultTypes();
    }
    if(type !== 'html') {
      const typeObj = this.customTypes[type];
      return typeObj ?? this.customTypes['info'];
    }
    return {color:'#ffffff',icon:''};
  }
}
