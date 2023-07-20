import {
  Activity,
  ApiService,
  GridComponent, LoadApiService,
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
    let traderNameList = await ApiService.get(Resolver.getModifiedUrl('{endpoint}/ctrm-api/api/trade/v1/getuser?tenantId={tenantId}&userType=Trader',environment)).then((next: any) => next);
    StoreService.addListValues("common","common_traderName",Resolver.convertListObjectToListOptions(traderNameList,'value','value'));
    this.screenJson.addOption('config',config);

    let loadApiResponse:any = await LoadApiService.getInstance()
      .setMaster("commodity")
      .addMaserCriteria("commodity")
      .callApi(environment,null).then((next) => next);
    StoreService.addListValues(this.screenJson.title,"commodity",Resolver.convertListStringToListOptions(loadApiResponse["commodity"]));
    grid.loadJson(this.screenJson);
  }

  onButtonClick(name: string, options?: any): void {
  }

}
