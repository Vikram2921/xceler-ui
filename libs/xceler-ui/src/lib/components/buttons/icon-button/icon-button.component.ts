import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {AnimationProp} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'xui-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent {

  @Output() clickButton = new EventEmitter();
  @Input() disabled:boolean = false;
  @Input() icon!:IconProp;
  @Input( ) animation!: AnimationProp;

  onClickButton() {
    this.clickButton.emit();
  }
}
