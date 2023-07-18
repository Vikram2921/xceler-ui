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
  StoreService, ToastMessageModel,
  ToastService
} from "@xceler-ui/xceler-ui";
import {PhysicalTradeActions} from "./physicals/physical_trade/PhysicalTradeActions";
import {ProfileFunctions} from "../../../../libs/xceler-ui/src/lib/profiles/Profiles";
import {PhysicalTrade} from "./physicals/physical_trade/physical-trade";
import {environment} from "./environment";
import {RecordInfoComponent} from "../../../../libs/xceler-ui/src/lib/components/RecordInfo/record-info.component";

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
    this.loadingPop = ToastService.showLoadingPopup('Please wait while we load the application',{path:'./assets/loading.gif',width:100,height:100});
  }


  private registerComponent() {
    ComponentRegister.registerComponent("navbar",ScreenInfoComponent);
    ComponentRegister.registerComponent("grid",GridComponent);
    ComponentRegister.registerComponent("grid_toolbar",GridToolbarComponent);
    ComponentRegister.registerComponent("tabs",OptionButtonComponent);
    ComponentRegister.registerComponent("info",RecordInfoComponent);
  }


  private registerScreens() {
    ScreenRegister.addScreen("physicalTrade",new PhysicalTrade());
    // ScreenRegister.addScreen("paperTrade",new PaperTrade());
  }

  private registerToastTypes() {
    ToastService.registerType('error', '', '#E90000');
    ToastService.registerType('success', '', '#0080007F');
  }



  async ngAfterViewInit() {
    this.registerComponent();
    this.loaded = true;
    this.cd.detectChanges();
    await this.storeCommonLists();
    this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID,{environment:environment,screen:'physicalTrade'});
  }

  toggleOptions() {
    this.screen = this.screen === 'physicalTrade' ? 'paperTrade' : 'physicalTrade';
    this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID, this.screen)
  }

  onItemChange(item: any) {
    if(item.profile) {
      this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID, {environment:environment,profile:item.profile});
    }
  }

  private async storeCommonLists() {
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
