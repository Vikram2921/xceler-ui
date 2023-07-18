import {ApiService, FunctionParams, ListOption, PopupService, Resolver, StoreService} from "@xceler-ui/xceler-ui";
import {DeliveryScheduleComponent} from "./delivery-schedule/delivery-schedule.component";
import {environment} from "../../environment";


export const PhysicalTradeActions: { [key: string]: Function } = {
  company: (params: FunctionParams) => {

  },
  counterpartyCode: (params: FunctionParams) => {

  },
  commodity: async (params: FunctionParams) => {
    let url = "{endpoint}/ctrm-api/api/commodity/v1/getcommoditydefaultproperties?tenantId={tenantId}&commodityName={commodity}";
    let response = await ApiService.get(Resolver.getModifiedUrl(url, environment, {commodity: params.currentValue})).then((response: any) => response);
    let brand = Array.from<ListOption>(response.CommodityBrand ?? []);
    let grade = Array.from<ListOption>(response.CommodityGrade ?? []);
    let origin = Array.from<ListOption>(response.CommodityOrigin ?? []);
    let season = Array.from<ListOption>(response.CommoditySeason ?? []);
    let externalPackage = Array.from<ListOption>(response.CommodityExternalPackage ?? []);
    let internalPackage = Array.from<ListOption>(response.CommodityPackage ?? []);
    brand.splice(0, 0, new ListOption());
    grade.splice(0, 0, new ListOption());
    origin.splice(0, 0, new ListOption());
    season.splice(0, 0, new ListOption());
    externalPackage.splice(0, 0, new ListOption());
    internalPackage.splice(0, 0, new ListOption());
    StoreService.addListValues(params.activity.screenJson.title, "brand", brand);
    StoreService.addListValues(params.activity.screenJson.title, "grade", grade);
    StoreService.addListValues(params.activity.screenJson.title, "origin", origin);
    StoreService.addListValues(params.activity.screenJson.title, "season", season);
    StoreService.addListValues(params.activity.screenJson.title, "externalPackage", externalPackage);
    StoreService.addListValues(params.activity.screenJson.title, "internalPackage", internalPackage);
    params.formControlService.patchValue('brand', brand[1] ? brand[1].value : '');
    params.formControlService.patchValue('grade', grade[1] ? grade[1].value : '');
    params.formControlService.patchValue('origin', origin[1] ? origin[1].value : '');
    params.formControlService.patchValue('season', season[1] ? season[1].value : '');

  },
  packageType: (params: FunctionParams) => {
    let currentValue = params.currentValue;
    if (currentValue.toLowerCase() === "unit") {
      params.formControlService.disable('quantity', 0);
      params.formControlService.enable("internalPackage")
      params.formControlService.enable("internalPackageUnit")
    } else {
      params.formControlService.enable('quantity');
      params.formControlService.disable("internalPackage", '')
      params.formControlService.disable("internalPackageUnit", 0)
    }
  },
  priceType: (params: FunctionParams) => {
    let currentValue = params.currentValue;
    if (currentValue.toLowerCase() !== "fixed") {
      params.formControlService.disable('tradePrice', 0);
      if (currentValue.toLowerCase() === "ptbf") {
        params.formControlService.enable("provisionalPricing");
      }
    } else {
      params.formControlService.disable("provisionalPricing", false);
      params.formControlService.enable('tradePrice');
    }
  },
  provisionalPricing: (params: FunctionParams) => {
    let currentValue = params.currentValue;
    if (currentValue) {
      params.formControlService.enable('provisionalPriceType');
      params.formControlService.enable('percentage');
      params.formControlService.enable('provisionalPrice');
      params.formControlService.enable('provisionalPriceCurrency');
      params.formControlService.enable('provisionalPriceUom');
    } else {
      params.formControlService.disable('provisionalPriceType', '');
      params.formControlService.disable('percentage', 0);
      params.formControlService.disable('provisionalPrice', '');
      params.formControlService.disable('provisionalPriceCurrency', '');
      params.formControlService.disable('provisionalPriceUom', '');
    }
  },
  deliverySchedule: (params: FunctionParams) => {
    let headerProps: any = {
      show: true,
      title: 'Delivery Schedule',
    }
    PopupService.addPopup("deliverySchedule", DeliveryScheduleComponent, params, headerProps);
  }
}
