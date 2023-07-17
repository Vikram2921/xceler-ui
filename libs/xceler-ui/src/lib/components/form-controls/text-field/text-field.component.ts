import {Component, forwardRef, Input} from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'xui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ]
})
export class TextFieldComponent extends BaseFormControl{
  @Input() placeholder: any = 'Enter Value';
  @Input() type: string = 'text';
  writeValue(obj: any): void {
    this.value = obj;
  }

}
