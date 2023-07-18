import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Resolver} from "../../../models/resolver";
import {BaseFormControl} from "../core/base-form-control";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'xui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ]
})
export class SliderComponent extends BaseFormControl implements OnInit{
  @Input() min: any = 0;
  @Input() max: any = 100;
  @Input() direction: any = 'ltr';
  @Input() hoverFormat: string = '{value} MT';
  @Input() maxFormat: string = '{value} KG';
  @Output() onChangeValue = new EventEmitter();
  hoverValue: string = '';
  maxValue: string = '';
  left: number = 0;

  constructor(private cd:ChangeDetectorRef) {
    super();
  }

  onSliderChange(event: any) {
    this.value = event.target.value;
    this.updateView();
    this.onChangeValue.emit(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.updateView();
  }

  private updateView() {
    this.hoverValue = Resolver.getModifiedUrl(this.hoverFormat, {value: this.value});
    this.maxValue = Resolver.getModifiedUrl(this.maxFormat, {value: this.max});
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.updateView();
  }

  protected readonly Resolver = Resolver;
}
