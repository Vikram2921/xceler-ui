import {ControlValueAccessor} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {HostActivity} from "../../../models/host-activity";

@Component({
  selector: 'xui-base-control',
  template: '',
})
export abstract class BaseFormControl extends HostActivity implements ControlValueAccessor{

  @Input('value') val: any;
  @Input('name') name: string = '';
  @Input() disabled: boolean = false;
  @Input() styleClass: string = '';


  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  abstract writeValue(obj: any): void;
}
