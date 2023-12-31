import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class DualSliderComponent extends BaseFormControl implements OnChanges{

  @Input() leftField:string = 'min';
  @Input() rightField:string = 'max';
  @Input() customOptions?:any;
  hoverFormatLeft:string = '-{value}';
  maxFormatLeft:string = '-{value}';
  hoverFormatRight:string = '{value}';
  maxFormatRight:string = '{value}';

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

  setCustomOptions(options:any) {
      this.hoverFormatLeft = options.hoverFormatLeft;
      this.maxFormatLeft = options.maxFormatLeft;
      this.hoverFormatRight = options.hoverFormatRight;
      this.maxFormatRight = options.maxFormatRight;
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes['customOptions']?.currentValue) {
        this.setCustomOptions(changes['customOptions'].currentValue);
    }
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
