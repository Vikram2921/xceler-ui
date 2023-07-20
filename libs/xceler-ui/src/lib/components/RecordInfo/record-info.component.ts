import {Component, HostListener, OnInit} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
import {ColumnModel} from "../../models/column-model";

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
    this.rowData = props['data'];
    this.columns = props['columns'];
  }

  ngOnInit(): void {
    this.maxItem = (window['visualViewport']!.width) / (window['visualViewport']!.width * 0.12);
  }
}
