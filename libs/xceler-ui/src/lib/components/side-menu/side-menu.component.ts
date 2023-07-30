import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BaseComponent} from "../form-controls/core/base-component";
import {ApiService} from "../../services/api-service.service";
import {ContextPopupComponent} from "../context-popup/context-popup.component";
import {ComponentRegister} from "../../registers/component-register.service";

@Component({
  selector: 'xui-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent extends BaseComponent implements OnChanges {


  pinned: boolean = false;
  hovered: boolean = false;
  @Input() unpinnedWidth: string = '';
  @Input() pinnedWidth: string = '';
  @Input() jsonPath: string = '';
  @Output() onChangeItem: EventEmitter<any> = new EventEmitter();
  @Output() onPinned: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(ContextPopupComponent) contextPopup!: ContextPopupComponent;
  menuJson:any =[];
  childs:any[] = [];

  constructor() {
    super();
  }

  togglePin() {
    this.pinned = !this.pinned;
    this.onPinned.emit(this.pinned);
  }

  async setup() {
    this.menuJson = await ApiService.get(this.jsonPath).then(next => next);
    this.onPinned.emit(this.pinned);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonPath']) {
      this.jsonPath = changes['jsonPath'].currentValue;
      this.setup();
    }
  }

  onClickItem(item: any) {
    ComponentRegister.unsubscribeAll();
    this.onChangeItem.emit(item);
  }

  showChilds(item: any) {
    this.childs = item.childs;
  }
}
