import {
  ApiService,
  FunctionParams,
  ListOption,
  PopupService,
  Resolver,
  StoreService
} from "@xceler-ui/xceler-ui";
import {DeliveryScheduleComponent} from "./delivery-schedule/delivery-schedule.component";
import {environment} from "../../environment";
import {DeliverySchedule} from "./delivery-schedule/delivery-schedule";


export const PhysicalTradeActions: { [key: string]: Function } = {
  company: (params: FunctionParams) => {

  },
  counterpartyCode: async (params: FunctionParams) => {
    let url = "{endpoint}/api-bm/api/counterpartypaymentterm/v1/getpaymenttermbycunterpartyname?tenantId={tenantId}&name={name}";
    let response = await ApiService.get(Resolver.getModifiedUrl(url, environment, {name:  encodeURIComponent(params.currentValue)})).then((response: any) => response);
    let list:ListOption[] = Resolver.convertListObjectToListOptions(response,"approvedPaymentTermName","approvedPaymentTermName");
    StoreService.addListValues(params.activity.screenJson.title, "paymentTerm", list);
    let defaultPaymentTerm = response.filter((item:any) => item.defaultValue)
    params.formControlService.getFormGroup().controls['paymentterm'].patchValue(defaultPaymentTerm[0] ? defaultPaymentTerm[0].approvedPaymentTermName : '');
  },
  commodity: async (params: FunctionParams) => {
    if(params.currentValue && params.currentValue.length > 0) {
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
      params.formControlService.patchValue('brand', brand[1] ? brand[1].value : '');
      params.formControlService.patchValue('grade', grade[1] ? grade[1].value : '');
      params.formControlService.patchValue('origin', origin[1] ? origin[1].value : '');
      params.formControlService.patchValue('season', season[1] ? season[1].value : '');
      params.formControlService.getFormGroup().updateValueAndValidity();
      StoreService.addListValues(params.activity.screenJson.title, "brand", brand);
      StoreService.addListValues(params.activity.screenJson.title, "grade", grade);
      StoreService.addListValues(params.activity.screenJson.title, "origin", origin);
      StoreService.addListValues(params.activity.screenJson.title, "season", season);
      StoreService.addListValues(params.activity.screenJson.title, "externalPackage", externalPackage);
      StoreService.addListValues(params.activity.screenJson.title, "internalPackage", internalPackage);
    }
  },
  deliveryScheduleCalc: async (params: FunctionParams) => {
    let packageType = params.formGroup?.value['packageType'];
    let uom = params.formGroup?.value['quantityUom'];
    let quantity = parseFloat(params.formGroup?.value['quantity']);
    let internalPackage = params.formGroup?.value['internalPackage'];
    let internalPackageUnit = parseFloat(params.formGroup?.value['internalPackageUnit']);
    let periodicity = params.formGroup?.value['quantityPeriodicity']
    let periodStartDate = params.formGroup?.value['periodStartDate']
    let periodEndDate = params.formGroup?.value['periodEndDate']
    let isAllFilled:boolean = false;
    if(packageType.toLowerCase() === "bulk") {
      if(uom && quantity && periodicity && periodEndDate && periodStartDate) {
          isAllFilled = true;
      }
    } else {
      if(uom && internalPackage && internalPackageUnit && periodicity && periodEndDate && periodStartDate) {
        isAllFilled = true;
      }
    }
    if(isAllFilled) {
      params.formControlService.patchValue("deliverySchedule",null);
      if(packageType.toLowerCase() === 'unit') {
        DeliverySchedule.quantityCalculation(params.formControlService.getFormGroup().value,environment).then((next) => {
          let resp = DeliverySchedule.getDeliveryList(params.formControlService.getFormGroup().value,next);
          params.formControlService.patchValue("deliverySchedule",resp.value);
          params.formControlService.patchValue("totalUnits",resp.totalNumberOfUnit);
          params.formControlService.patchValue("totalTradeQty",resp.total);
        })
      } else {
        let resp = DeliverySchedule.getDeliveryList(params.formControlService.getFormGroup().value,null);
        params.formControlService.patchValue("deliverySchedule",resp.value);
        params.formControlService.patchValue("totalUnits",resp.totalNumberOfUnit);
        params.formControlService.patchValue("totalTradeQty",resp.total);
      }
    }
  },
  packageType: (params: FunctionParams) => {
    let currentValue = params.currentValue;
    if (currentValue.toLowerCase() === "unit") {
      params.formControlService.disable('quantity', 0);
      params.formControlService.enable("internalPackage")
      params.formControlService.enable("internalPackageUnit")
      params.formControlService.enable("externalPackage")
      params.formControlService.enable("externalPackageUnit")
    } else {
      params.formControlService.enable('quantity');
      params.formControlService.disable("internalPackage", '')
      params.formControlService.disable("internalPackageUnit", 0)
      params.formControlService.disable("externalPackage",'')
      params.formControlService.disable("externalPackageUnit",0)
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
  loadLocationType: async (params: FunctionParams) => {
    let url = "{endpoint}/api-bm/api/location/v1/getallbylocationtype?tenantId={tenantId}&locationType={locationType}";
    let response = await ApiService.get(Resolver.getModifiedUrl(url, environment, {locationType: params.currentValue})).then((response: any) => response);
    if(response) {
      let list:ListOption[] = Resolver.convertListObjectToListOptions(response,'name','name');
      if(params.field?.field === "loadLocationType") {
        StoreService.addListValues(params.activity.screenJson.title, "loadLocation", list);
        params.formControlService.patchValue('loadLocation', '');
      } else {
        StoreService.addListValues(params.activity.screenJson.title, "dischargeLocation", list);
        params.formControlService.patchValue('dischargeLocation', '');
      }
    }
  },
  deliverySchedule: (params: FunctionParams) => {
    let headerProps: any = {
      show: true,
      title: 'Delivery Schedule',
    }
    PopupService.addPopup("deliverySchedule", DeliveryScheduleComponent, params, headerProps);
  },
  paymentterm: async (params: FunctionParams) => {
    if(params.currentValue && params.currentValue.length > 0) {
      let url = "{endpoint}/api-bm/api/paymentterm/v1/getpaymenttermbyname?tenantId={tenantId}&paymentTerm={name}";
      let response = await ApiService.get(Resolver.getModifiedUrl(url, environment, {name:  encodeURIComponent(params.currentValue)})).then((response: any) => response);
      if(response && response.length > 0 && response[0]) {
        params.formControlService.getFormGroup().controls['paymentTermsClause'].patchValue(response[0].description);
      }
    }
  },
  quantityToleranceType: (params:FunctionParams) => {
      if(params.field) {
        let hoverFormatMax: string;
        let maxFormatMax: string;
        let hoverFormatMin: string;
        let maxFormatMin: string;
        let unit = params.formGroup?.value['quantityUom'];
        if(params.currentValue === "percentage") {
          unit ="%";
        }
        hoverFormatMax = "{value} " + unit;
        maxFormatMax = "{value} " + unit;
        maxFormatMin = "-{value} " + unit;
        hoverFormatMin = "-{value} " + unit;
        let options:any = {};
        options['maxFormatLeft'] = maxFormatMin;
        options['hoverFormatLeft'] = hoverFormatMin;
        options['maxFormatRight'] = maxFormatMax;
        options['hoverFormatRight'] = hoverFormatMax;
        params.field.customOptions = options;
      }
  }
}
