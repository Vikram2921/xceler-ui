import {Grid} from "./grid";
import {GridComponent} from "@xceler-ui/xceler-ui";
import {ScreenModel} from "../models/screen-model";

export interface Activity extends Grid {
  screenJson:ScreenModel;
  beforeRender(grid:GridComponent):any;
  onButtonClick(title:string):any;
}
