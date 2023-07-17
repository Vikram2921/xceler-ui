import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseFormControl} from "../core/base-form-control";
import {ListOption} from "../core/list-option";

@Component({
  selector: 'xui-unit-input',
  templateUrl: './unit-input.component.html',
  styleUrls: ['./unit-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UnitInputComponent),
      multi: true,
    },
  ]
})
export class UnitInputComponent extends BaseFormControl{

  @Input() options:ListOption[] = [];
  writeValue(obj: any): void {
    this.value = obj;
  }

}
