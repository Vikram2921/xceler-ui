import {Grid} from "./grid";
import {GridComponent} from "../grid/grid.component";
import {ScreenModel} from "../models/screen-model";

export interface Activity extends Grid {
  screenJson:ScreenModel;
  beforeRender(grid:GridComponent):any;
  onButtonClick(title:string):any;
}
