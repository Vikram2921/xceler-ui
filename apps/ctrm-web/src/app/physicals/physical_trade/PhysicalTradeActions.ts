import {FunctionParams, PopupService} from "@xceler-ui/xceler-ui";
import {DeliveryScheduleComponent} from "./delivery-schedule/delivery-schedule.component";


export const PhysicalTradeActions:{[key:string]:Function} = {
  company: (params:FunctionParams) => {

  },
  counterpartyCode: (params:FunctionParams) => {

  },
  packageType: (params:FunctionParams) => {
    let currentValue = params.currentValue;
    if(currentValue.toLowerCase() === "unit") {
      params.formControlService.disable('quantity',0);
      params.formControlService.enable("internalPackage")
      params.formControlService.enable("internalPackageUnit")
    } else {
      params.formControlService.enable('quantity');
      params.formControlService.disable("internalPackage",'')
      params.formControlService.disable("internalPackageUnit",0)
    }
  },
  priceType: (params:FunctionParams) => {
    let currentValue = params.currentValue;
    if(currentValue.toLowerCase() !== "fixed") {
        params.formControlService.disable('tradePrice',0);
        if(currentValue.toLowerCase() === "ptbf") {
          params.formControlService.enable("provisionalPricing");
        }
    } else {
      params.formControlService.disable("provisionalPricing",false);
      params.formControlService.enable('tradePrice');
    }
  },
  provisionalPricing: (params:FunctionParams) => {
    let currentValue = params.currentValue;
    if(currentValue) {
        params.formControlService.enable('provisionalPriceType');
        params.formControlService.enable('percentage');
        params.formControlService.enable('provisionalPrice');
        params.formControlService.enable('provisionalPriceCurrency');
        params.formControlService.enable('provisionalPriceUom');
    } else {
      params.formControlService.disable('provisionalPriceType','');
      params.formControlService.disable('percentage',0);
      params.formControlService.disable('provisionalPrice','');
      params.formControlService.disable('provisionalPriceCurrency','');
      params.formControlService.disable('provisionalPriceUom','');
    }
  },
  deliverySchedule: (params:FunctionParams) => {
    let headerProps:any = {
      show:true,
      title:'Delivery Schedule',
    }
    PopupService.addPopup("deliverySchedule",DeliveryScheduleComponent,params,headerProps);
  }
}
