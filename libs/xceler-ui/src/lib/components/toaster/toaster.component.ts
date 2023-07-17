import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ToastMessageModel} from "./model/ToastMessageModel";
import {ToastService} from "./service/toast.service";

@Component({
  selector: 'xui-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ToasterComponent  {

  @Input() width = '25%';


  deleteMessage(toastMessageModel: ToastMessageModel) {
    ToastService.deleteMessage(toastMessageModel);
  }

  getAllMessages() {
    return ToastService.getAllMessages();

  }

  getType(type:string) {
    return ToastService.getType(type);
  }

  onClickButton(msg:ToastMessageModel, button:string) {
    if(msg.props['onClickButton'] !== null && msg.props['onClickButton'] !== undefined){
      msg.props['onClickButton'](button);
    }
  }

  protected readonly ToastService = ToastService;
}
