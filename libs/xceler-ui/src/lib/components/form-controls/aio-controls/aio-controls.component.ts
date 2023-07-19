import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlType} from "../../../models/control-type";
import {ListOption} from "../core/list-option";

@Component({
  selector: 'xui-aio-controls',
  templateUrl: './aio-controls.component.html',
  styleUrls: ['./aio-controls.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AioControlsComponent),
      multi: true,
    },
  ]
})
export class AioControlsComponent extends BaseFormControl {
  @Input() field: string | null = '';
  @Input() header: string | null = '';
  @Input() pipe!: string;
  @Input() pipeOptions!: any;
  @Input() controlDisabledView: boolean = false;
  @Input() controlType: ControlType | string = '';
  @Input() listOptions!: ListOption[];
  @Input() customOptions!: any;
  @Output() onChangeValue = new EventEmitter<any>();
  @Output() onFocusField: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickButton: EventEmitter<string> = new EventEmitter<string>();
  @Input() max: any;
  @Input() min: any;

  writeValue(obj: any): void {
    this.value = obj;
  }

  onFocusIn() {
    this.onFocusField.emit(this.field ?? '');
  }

  onButtonClick() {
    this.onClickButton.emit(this.field ?? '');
  }

  updateValue($event: any) {
    this.value = $event;
    this.onChangeValue.emit($event)
  }
}
