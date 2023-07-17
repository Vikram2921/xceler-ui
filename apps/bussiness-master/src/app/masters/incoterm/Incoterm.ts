import {Activity, GridComponent, PageObject, ScreenModel} from "@xceler-ui/xceler-ui";
import json from "./incoterm.json"
export class Incoterm implements Activity {
  screenJson: ScreenModel = Object.assign(new ScreenModel(),json);
  selectedRows: any[] = [];
  data: any[] | PageObject = [];
  beforeRender(grid: GridComponent): any {
    grid.loadJson(this.screenJson);

  }

  onButtonClick(title: string): any {
  }

}
