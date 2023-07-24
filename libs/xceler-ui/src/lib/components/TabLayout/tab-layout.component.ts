import {Component} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
@Component({
  selector: 'xui-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.css'],
})
export class TabLayoutComponent extends HostActivity{

  tabs:any[] =[];
  selected: any = '';
  override init(props: { [p: string]: any }) {
      this.tabs = props['tabs'] || [];
      this.selected = props['selected'] || '';
      if(this.selected == null || this.selected.length === 0) {
        this.selected = this.tabs[0];
      }
  }


  onSelect(tab: any) {
    this.selected = tab;
  }
}
