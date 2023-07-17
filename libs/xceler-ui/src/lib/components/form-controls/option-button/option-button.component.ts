import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ListOption} from "../core/list-option";
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'xui-option-button',
  templateUrl: './option-button.component.html',
  styleUrls: ['./option-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionButtonComponent),
      multi: true,
    },
  ]
})
export class OptionButtonComponent extends BaseFormControl{

  @Input() options:ListOption[] = [];
  @Output() onOptionChange = new EventEmitter();
  @Input() checkDisabledFunction!:Function;
  visible: boolean = true;

  selectOption(option: ListOption) {
    if(this.disabled || this.isDisabled(option)) {
      return;
    }
    this.value = option.value;
    this.onOptionChange.emit(option);
  }

  setOptions(option: ListOption[]) {
    this.options = option;
  }

  isDisabled(option:ListOption):boolean{
      return this.checkDisabledFunction && this?.checkDisabledFunction(option);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
