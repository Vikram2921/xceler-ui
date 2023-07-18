import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseFormControl} from "../core/base-form-control";

@Component({
  selector: 'xui-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DualSliderComponent),
      multi: true,
    },
  ]
})
export class DualSliderComponent extends BaseFormControl {

  @Input() leftField:string = 'min';
  @Input() rightField:string = 'max';

  val1: number = 0;
  val2: number = 0;

  writeValue(obj: any): void {
    if(!obj) {
      obj = {};
      obj[this.leftField] = 0;
      obj[this.rightField] = 0;
    }
    if(typeof obj == 'string') {
      obj = JSON.parse(obj);
    }
    this.value = obj;
    this.updateValue();
  }

  private updateValue() {
    this.val1 = this.value[this.leftField];
    this.val2 = this.value[this.rightField];
  }

  onChangeSliderLeft(val: any) {
    this.value[this.leftField] = val;
  }

  onChangeSliderRight(val: any) {
    this.value[this.rightField] = val;
  }
}
