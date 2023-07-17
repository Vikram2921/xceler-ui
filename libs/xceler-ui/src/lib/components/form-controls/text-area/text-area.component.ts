import { Component } from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";

@Component({
  selector: 'xui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent extends BaseFormControl{
  writeValue(obj: any): void {
    this.value = obj;
  }

}
