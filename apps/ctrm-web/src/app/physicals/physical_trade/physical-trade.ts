import {
  Activity,
  ApiService,
  GridComponent,
  PageObject,
  Resolver,
  ScreenModel,
  StoreService
} from "@xceler-ui/xceler-ui";
import json from "./screen-model.json"
import {environment} from "../../environment";

export class PhysicalTrade implements Activity {
  screenJson: ScreenModel = Object.assign(new ScreenModel(),json);
  selectedRows: any[] = [];
  data: any[] | PageObject = [];
  async beforeRender(grid:GridComponent) {
    let config = await ApiService.get(Resolver.getModifiedUrl('{endpoint}/ctrm-api/api/trade/v1/loadconfigdata?tenantId={tenantId}',environment)).then((next: any) => next);
    StoreService.addStore(this.screenJson.title);
    Object.keys(config).forEach(key => {
      StoreService.addListValues(this.screenJson.title,key,Resolver.convertListStringToListOptions(config[key]));
    })
    this.screenJson.addOption('config',config);
    grid.loadJson(this.screenJson);
  }

  onButtonClick(name: string, options?: any): void {
  }

}
