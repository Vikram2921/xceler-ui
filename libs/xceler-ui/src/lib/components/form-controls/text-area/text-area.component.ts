import {Component, forwardRef} from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'xui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ]
})
export class TextAreaComponent extends BaseFormControl{
  writeValue(obj: any): void {
    this.value = obj;
  }

}
