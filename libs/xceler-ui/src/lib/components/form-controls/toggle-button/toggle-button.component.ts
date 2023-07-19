import {Component, ElementRef, forwardRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
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
  buttonWidth = 60;

  constructor(private renderer: Renderer2,private elementRef: ElementRef) {
    super();
  }
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
      this.updateButtonWidth();
    }
  }

  private updateButtonWidth() {
    const textWidthTrue = this.getTextWidth(this.trueText);
    const textWidthFalse = this.getTextWidth(this.falseText);
    this.buttonWidth = Math.max(Math.max(textWidthTrue,textWidthFalse) + 60, 60);
  }

  private getTextWidth(text: string): number {
    const tempElement = this.renderer.createElement('span');
    this.renderer.setStyle(tempElement, 'visibility', 'hidden');
    this.renderer.setStyle(tempElement, 'white-space', 'nowrap');
    this.renderer.appendChild(tempElement, this.renderer.createText(text));
    this.renderer.appendChild(this.elementRef.nativeElement, tempElement);
    const width = tempElement.offsetWidth;
    this.renderer.removeChild(this.elementRef.nativeElement, tempElement);
    return width;
  }


}
