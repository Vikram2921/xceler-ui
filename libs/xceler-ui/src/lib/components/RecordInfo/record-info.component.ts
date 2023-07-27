import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
import {ColumnModel} from "../../models/column-model";
import {JsonToUIService} from "../json-to-ui/json-to-ui/json-to-ui.service";
import {Profiles} from "../../enums/profiles";

@Component({
  selector: 'xui-record-info',
  templateUrl: './record-info.component.html',
  styleUrls: ['./record-info.component.css'],
})
export class RecordInfoComponent extends HostActivity implements OnInit{
  view_more_label: string = 'View More';
  toggled:boolean = false;
  list: any[] =Array.from(Array(30).keys());
  maxItem: number = 5;
  columns: ColumnModel[] =[];
  rowData: any;
  idField!:string;
  options:any;
  @Output() onClickBack = new EventEmitter();
  toggleViewMore() {
    if(!this.toggled) {
        this.view_more_label = 'View Less';
        this.toggled = true;
    }
    else {
        this.toggled = false;
        this.view_more_label = 'View More';
    }
  }

  override init(props: { [p: string]: any }) {
    this.options = props;
    this.rowData = props['data'];
    this.columns = props['columns'];
    this.idField= props['columns'].find((item:ColumnModel) => item.idField).field;
  }

  ngOnInit(): void {
    this.maxItem = (window['visualViewport']!.width) / (window['visualViewport']!.width * 0.12);
  }

  back() {
    let screenId = this.options.mainActivity.screenJson.title;
    let state = JsonToUIService.getState(screenId,false);
    let lastProfile = state.profile;
    let currentOption = state.currentOptions;
    this.onClickBack.emit();
    JsonToUIService.get(this.options.componentId).loadProfile(lastProfile,currentOption);
  }
}
