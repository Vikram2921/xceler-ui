import {Activity, GridComponent, PageObject, ScreenModel} from "@xceler-ui/xceler-ui";
import json from './cost.json';

export class Cost implements Activity {
  data: any[] | PageObject = [];
  screenJson: ScreenModel = ScreenModel.fromJson(json);
  selectedRows: any[] = [];

  beforeRender(grid: GridComponent): any {
    console.log(grid);
    grid.loadJson(this.screenJson);
  }

  onButtonClick(title: string): any {
  }

}
