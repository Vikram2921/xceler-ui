import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  ApiService,
  ComponentRegister,
  FunctionRegister,
  GridComponent,
  GridToolbarComponent,
  JSONToUIComponent,
  OptionButtonComponent,
  PopupComponent,
  ProfileRegister,
  Profiles,
  Resolver,
  ScreenInfoComponent,
  ScreenRegister,
  StoreService,
  ToastMessageModel,
  ToastService,
  RecordInfoComponent,
  JsonToUIService,
  TabContentComponent
} from "@xceler-ui/xceler-ui";
import {PhysicalTradeActions} from "./physicals/physical_trade/PhysicalTradeActions";
import {ProfileFunctions} from "../../../../libs/xceler-ui/src/lib/profiles/Profiles";
import {PhysicalTrade} from "./physicals/physical_trade/physical-trade";
import {environment} from "./environment";
import {TabLayoutComponent} from "@xceler-ui/xceler-ui";
import {QualitySpecification} from "./physicals/physical_trade/quality_specs/quality_specification";
import {Cost} from "./physicals/physical_trade/cost/cost";

@Component({
  selector: 'xceler-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,AfterViewInit{
  @ViewChild(JSONToUIComponent) jsonToUIComponent!:JSONToUIComponent;
  @ViewChild("popup") popup!:TemplateRef<PopupComponent>;
  pinned: boolean = false;
  unpinWidth: string = '4.5rem';
  pinWidth: string = '20rem';
  loaded:boolean = false;
  screen:string = 'physicalTrade';
  loadingPop!:ToastMessageModel;
  constructor(private cd:ChangeDetectorRef) {
    ProfileRegister.registerAllProfiles();
  }
  ngOnInit(): void {
    this.registerFunctionFiles();
    this.registerScreens();
    this.registerToastTypes();
  }

  private registerFunctionFiles() {
    FunctionRegister.registerFunctionsFile('profiles',ProfileFunctions);
    FunctionRegister.registerFunctionsFile('PhysicalTradeActions',PhysicalTradeActions);
  }


  private registerComponent() {
    ComponentRegister.registerComponent("navbar",ScreenInfoComponent);
    ComponentRegister.registerComponent("grid",GridComponent);
    ComponentRegister.registerComponent("grid_toolbar",GridToolbarComponent);
    ComponentRegister.registerComponent("tabs",OptionButtonComponent);
    ComponentRegister.registerComponent("info",RecordInfoComponent);
    ComponentRegister.registerComponent("tabsLayout",TabLayoutComponent);
  }


  private registerScreens() {
    ScreenRegister.addScreen("physicalTrade",new PhysicalTrade());
    ScreenRegister.addScreen("qualitySpecs",new QualitySpecification());
    ScreenRegister.addScreen("cost",new Cost());
  }

  private registerToastTypes() {
    ToastService.registerType('warning', '', 'rgba(255,165,0,0.64)');
    ToastService.registerType('error', '', '#E90000');
    ToastService.registerType('success', '', '#0080007F');
  }



  async ngAfterViewInit() {
    this.registerComponent();
    this.loaded = true;
    this.cd.detectChanges();
    await this.storeCommonLists();
    JsonToUIService.add('ctrm_web',this.jsonToUIComponent);
    this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID,{environment:environment,screen:'physicalTrade',componentId:"ctrm_web",lastProfile:Profiles.SIMPLE_GRID});
  }

  onItemChange(item: any) {
    if(item.profile) {
      this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID, {environment:environment,profile:item.profile,componentId:"ctrm_web",lastProfile:Profiles.SIMPLE_GRID});
    }
  }

  private async storeCommonLists() {
    StoreService.init();
    let url = "{endpoint}/api-iam/api/userProfile/v1/getUserDetails?userId={username}&tenantId={tenantId}"
    let resp = await ApiService.get(Resolver.getModifiedUrl(url,environment)).then((next:any) => next);
    StoreService.addStore("common");
    StoreService.addListValues("common","common_commodity",Resolver.convertListObjectToListOptions(resp['userInfoData'].Commodity,'masterTypeValue','masterTypeValue'))
    StoreService.addListValues("common","common_company",Resolver.convertListObjectToListOptions(resp['userInfoData'].Company,'masterTypeValue','masterTypeValue'))
    StoreService.addListValues("common","common_counterparty",Resolver.convertListObjectToListOptions(resp['userInfoData'].Counterparty,'masterTypeValue','masterTypeValue'))
    StoreService.addListValues("common","common_profitcenter",Resolver.convertListObjectToListOptions(resp['userInfoData']['Profit Center'],'masterTypeValue','masterTypeValue'))
    this.loadingPop?.close();
  }
}
