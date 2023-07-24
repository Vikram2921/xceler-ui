import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ListOption} from "../core/list-option";
import {ColumnModel} from "../../../models/column-model";

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
export class AioControlsComponent extends BaseFormControl{
  @Input() listOptions!: ListOption[];
  @Input() showHeader:boolean = true;
  @Input() columnModel!: ColumnModel;
  @Output() onChangeValue = new EventEmitter<any>();
  @Output() onFocusField: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickButton: EventEmitter<string> = new EventEmitter<string>();
  writeValue(obj: any): void {
    this.value = obj;
  }

  onFocusIn() {
    this.onFocusField.emit(this.columnModel.field ?? '');
  }

  onButtonClick() {
    this.onClickButton.emit(this.columnModel.field ?? '');
  }

  updateValue($event: any) {
    this.value = $event;
    this.onChangeValue.emit($event)
  }

}
