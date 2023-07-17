import {Component} from '@angular/core';
import {HostActivity} from "../models/host-activity";

@Component({
  selector: 'xui-screen-info',
  templateUrl: './screen-info.component.html',
  styleUrls: ['./screen-info.component.css']
})
export class ScreenInfoComponent extends HostActivity{

  iconPath!:string;
  title!:string;
  advanceFilter!:boolean;
  count: number = 10;

  configure(iconPath:string, title:string, advanceFilter:boolean) {
    this.iconPath = iconPath;
    this.title = title;
    this.advanceFilter = advanceFilter;
  }

  override init(props: { [p: string]: any }) {
    if(props['func']) {
      props['func'](this);
    }
  }

}
