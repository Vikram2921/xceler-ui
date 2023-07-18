import {Activity, GridComponent, PageObject, ScreenModel} from "@xceler-ui/xceler-ui";
import json from "./counterparty.json"
export class Counterparty implements Activity {
  data: any[] | PageObject =[];
  screenJson: ScreenModel = Object.assign(new ScreenModel(),json);
  selectedRows: any[] = [];

  beforeRender(grid: GridComponent): any {
    grid.loadJson(this.screenJson);
  }

  onButtonClick(title: string): any {
  }

}
