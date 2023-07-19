import {Component, Input} from '@angular/core';

export class ProgressButtonProp {
    text!: string;
    disabled!:boolean;
    loading!:boolean;
    callback?:Function;

constructor(text: string, disabled: boolean = false, loading: boolean = false,callback?:Function) {
    this.text = text;
    this.disabled = disabled;
    this.loading = loading;
    this.callback = callback;
  }
}
@Component({
  selector: 'xui-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.css']
})
export class ProgressButtonComponent {
  @Input() buttonProp!:ProgressButtonProp;

  onClickButton() {
    this.buttonProp.loading = !this.buttonProp.loading;
    if(this.buttonProp.callback) {
      this.buttonProp.callback(this.buttonProp);
    }
  }
}
