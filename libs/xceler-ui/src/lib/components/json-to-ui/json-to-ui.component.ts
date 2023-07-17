import {ChangeDetectorRef, Component, Input} from '@angular/core';
import { ComponentRegister } from "../../registers/component-register.service";
import {Profile, ProfileItem} from "./models/profile";
import {FunctionRegister} from "../../registers/function-register.service";
import {BaseComponent} from "../form-controls/core/base-component";
import {PopupService} from "../popup/service/popup-service.service";
import {ApiService} from "../../services/api-service.service";
import {ProfileRegister} from "../../profiles/ProfileRegister";
import {Profiles} from "../../enums/profiles";

@Component({
  selector: 'xui-json-to-ui',
  templateUrl: './json-to-ui.component.html',
  styleUrls: ['./json-to-ui.component.css']
})
export class JSONToUIComponent extends BaseComponent{

  profile!:Profile;
  @Input() showBorder:boolean = false;
  options:any = {}
  loaded:boolean = false;
  currentProfile:Profiles | string = '';

  constructor(private cd:ChangeDetectorRef,private apiService:ApiService) {
    super();
  }

  loadProfile(profile:Profiles,options:any) {
    PopupService.clearAll();
    if(this.currentProfile == profile) {
      this.updateProfileOptions(options);
    } else {
      this.currentProfile = profile;
      this.profile = ProfileRegister.getProfile(profile);
      this.setUpOptions(options);
      this.createAreas();
      this.loaded = true;
    }
    this.cd.detectChanges();
  }

  private updateProfileOptions(options:any) {
    this.setUpOptions(options,true);
  }

  private setUpOptions(options:any,update:boolean = false)  {
    if(this.profile.setupFunction !== null && this.profile.setupFunction !== undefined) {
      FunctionRegister.callFunction("profiles",this.profile.setupFunction,{options:options,update:update});
    }
    this.options = options;
  }

  getRepeat(type:string) {
    let val:any;
    if(type === 'columns') {
      if(this.profile.columnsWidthList !== null && this.profile.columnsWidthList !== undefined && this.profile.columnsWidthList.length > 0) {
        return this.profile.columnsWidthList.join(" ");
      }
      val = this.profile.columns;
    } else {
      if(this.profile.rowHeightList !== null && this.profile.rowHeightList !== undefined && this.profile.rowHeightList.length > 0) {
        return this.profile.rowHeightList.map(i => `minmax(${i},${i})`).join(" ");
      }
      val = this.profile.rows;
    }
    return 'repeat('+val+',1fr)'
  }

  createAreas() {
    let rows = this.profile['rows'];
    let columns = this.profile['columns'];
    let items = this.profile['items'];
    let areas:string = '';
    let row:any[] =[];
    for(let i = 1;i<=rows;i++) {
      row = [];
      for(let j = 1;j<=columns;j++) {
        row.push(this.getItemAt(i,j,items))
      }
      let row_line = "'"+row.join(" ")+"'";
      areas += row_line + " ";
    }
    return areas;
  }

  private getItemAt(i: number, j: number,items:ProfileItem[] =[]) {
    let filters =items.filter(item => {
      let rows:any[] = item.areaRowRange;
      if((rows.length === 1 && rows[0] === i) || (rows.length > 1 && i >= rows[0] && i<= rows[1])) {
        let columns:any[] = item.areaColRange;
        return ((columns.length === 1 && columns[0] === j) || (columns.length > 1 && j >= columns[0] && j <= columns[1]))
      }
      return false;
    })
    return filters.length > 0?filters[0].itemId:".";
  }

  protected readonly ComponentRegister = ComponentRegister;
}
