import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Tabs} from "../../models/screen-model";
import {JSONToUIComponent} from "../json-to-ui/json-to-ui.component";
import {Profiles} from "../../enums/profiles";

@Component({
  selector: 'xui-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css'],
})
export class TabContentComponent implements AfterViewInit {


  @ViewChild(JSONToUIComponent) jsonToUIComponent!: JSONToUIComponent;
  currentTab!: Tabs;

  changeTab(tab: Tabs) {
    this.currentTab = tab;
    this.updateView(true);
  }

  private updateView(update:boolean) {
    if (this.currentTab) {
      let profile:Profiles = this.currentTab.profile;
      let options:any = {};
      options['update'] = update;
      if(profile === Profiles.GRID_ONLY){
        options['screen'] = this.currentTab.modelName;
      }
      this.jsonToUIComponent.loadProfile(this.currentTab.profile, options);
    }
  }

  ngAfterViewInit(): void {
    this.updateView(true);
  }

}
