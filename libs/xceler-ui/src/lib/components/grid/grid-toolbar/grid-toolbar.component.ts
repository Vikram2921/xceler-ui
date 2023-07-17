import {Component, EventEmitter, Output} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
import {ButtonModel} from "../../buttons/icon-button/ButtonModel";
@Component({
  selector: 'xui-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['./grid-toolbar.component.css']
})
export class GridToolbarComponent extends HostActivity {
  leftButtons:ButtonModel[] = [];
  rightButtons:ButtonModel[] = [];
  @Output() onClickButton:EventEmitter<{ "buttonName":string }> = new EventEmitter();


  setLeftButton(buttons:ButtonModel[]) {
    this.leftButtons = buttons;
  }

  setRightButton(buttons:ButtonModel[]) {
    this.rightButtons = buttons;
  }

  private emitValue(button:ButtonModel) {
    this.onClickButton.emit(this.getEmitPayload(button))
  }

  private getEmitPayload(button:ButtonModel) {
      return {buttonName:button.name};
  }

  onClick(button: ButtonModel) {
    if(button.onClick) {
        button.onClick(this.getEmitPayload(button));
        return;
    }
    this.emitValue(button);
  }
}
