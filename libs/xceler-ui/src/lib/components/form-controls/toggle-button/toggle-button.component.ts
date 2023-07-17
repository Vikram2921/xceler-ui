import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ListOption} from "../core/list-option";
import {BaseFormControl} from "../core/base-form-control";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'xui-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('toggleState', [
      state('inactive', style({
        transform: 'translate(0,0)'
      })),
      state('active', style({
        transform: 'translate(30px,30px)'
      })),
      transition('inactive <=> active', animate('300ms ease-in'))
    ])
  ]
})
export class ToggleButtonComponent extends BaseFormControl implements OnChanges{

  @Input() options:ListOption[] = [];
  trueText:string = 'Active';
  falseText:string = 'Inactive';
  toggleButton() {
    this.value = !this.value;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['options']) {
      this.trueText = this.options.find(option => option.value)?.label??'Active';
      this.falseText = this.options.find(option => !option.value)?.label??'Inactive';
    }
  }


}
