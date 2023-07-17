import {ToastService} from "../service/toast.service";

export class ToastMessageModel {

  message:string | null;
  heading:string | null;
  type = 'info';
  autoHide = true;
  delay = 5000;
  position = 'right';
  props:{[key:string]:any} = {};

  constructor(message: string | null, heading: string | null, type: string,autoHide:boolean,delay?:number,position?:string,props:{[key:string]:any} = {}) {
    this.message = message;
    this.heading = heading;
    this.type = type;
    this.autoHide = autoHide;
    this.position = position??'right';
    this.delay = delay??5000;
    this.props = props??props;
  }

  close() {
    ToastService.deleteMessage(this);
  }
}
