import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
import {Tabs} from "../../models/screen-model";
import {TabContentComponent} from "../TabContent/tab-content.component";
@Component({
  selector: 'xui-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.css'],
})
export class TabLayoutComponent extends HostActivity implements AfterViewInit{

  tabs:Tabs[] =[];
  selected!: Tabs;
  environment:any;
  parentData:any;
  @ViewChild(TabContentComponent) tabContent!: TabContentComponent;
  override init(props: { [p: string]: any }) {
      this.tabs = props['tabs'] || [];
      this.environment = props['environment'] || {};
      this.selected = props['selected'] || null;
      this.parentData = props['parentData'] || null;
      if(this.selected == null){
        this.selected = this.tabs[0];
      }
  }


  onSelect(tab: Tabs) {
    this.selected = tab;
    this.tabContent.changeTab(this.selected, this.environment, this.parentData);
  }

  ngAfterViewInit(): void {
    this.tabContent.changeTab(this.selected, this.environment,this.parentData);
  }
}
