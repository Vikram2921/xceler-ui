import { Injectable } from '@angular/core';
import {ApiService, Resolver, StorageService} from "@xceler-ui/xceler-ui";

@Injectable({
  providedIn: 'root'
})
export class LoadApiService {

  private payload:any[];
  private masterName!:string;

  public static getInstance(masterName:string = "commodity") {
    return new LoadApiService();
  }

  constructor() {
    this.payload = [];
  }

  setMaster(masterName:string):LoadApiService {
    this.masterName = masterName;
    return this;
  }

  addMaserCriteria(modelName:string,fields?:any[]):LoadApiService {
    let obj = {
      tenantId: StorageService.get("tenantId"),
      serviceName: "xceler_configservice",
      model: modelName,
      requiredField: fields??["name"],
      filter: null
    }
    this.payload.push(obj);
    return this;
  }


  addGICriteria(fields?:any[]):LoadApiService{
    let obj = {
      tenantId: StorageService.get("tenantId"),
      serviceName: "xceler_configservice",
      model: "globalindicatordetails",
      requiredField: fields??["name"],
      filter: null
    }
    this.payload.push(obj);
    return this;
  }


  callApi(environment:{[key:string]:any},customInputs:any) {
    let url = "{endpoint}/api-bm/api/{masterName}/v1/load"
    if(!customInputs) {
      customInputs = {};
    }
    Object.assign(customInputs,{masterName:this.masterName});
    return ApiService.post(Resolver.getModifiedUrl(url,environment,customInputs),this.payload);
  }
}
