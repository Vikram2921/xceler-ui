import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'xui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter();

  onClickButton() {
    this.onClick.emit();
  }
}
