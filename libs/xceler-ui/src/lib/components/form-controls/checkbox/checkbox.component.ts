import {Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseFormControl} from "../core/base-form-control";

@Component({
  selector: 'xui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ]
})
export class CheckboxComponent extends BaseFormControl implements  OnChanges{

  @Input() checked:boolean = true;
  @Input() header:string | null = null;
  @Output() onCheckedChange = new EventEmitter();
  writeValue(obj: any): void {
    this.value = obj;
  }

  toggle() {
    this.value = !this.value;
    this.onCheckedChange.emit(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['checked']) {
        this.value = changes['checked'].currentValue;
    }
  }
}
