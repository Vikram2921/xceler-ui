import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  ApiService,
  ComponentRegister,
  FunctionRegister, GridComponent, GridToolbarComponent,
  JSONToUIComponent, OptionButtonComponent,
  PopupComponent,
  ProfileRegister, Profiles, Resolver, ScreenInfoComponent, ScreenRegister, StoreService, ToastService
} from "@xceler-ui/xceler-ui";
import {ProfileFunctions} from "../../../../libs/xceler-ui/src/lib/profiles/Profiles";
import {environment} from "./environment";
import {Incoterm} from "./masters/incoterm/Incoterm";
import {LocationMaster} from "./masters/location/location";

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
  constructor(private cd:ChangeDetectorRef) {
    ProfileRegister.registerAllProfiles();
  }
  ngOnInit(): void {
    this.registerFunctionFiles();
    this.registerScreens();
    this.registerToastTypes();
    this.storeCommonLists();
  }

  private registerFunctionFiles() {
    FunctionRegister.registerFunctionsFile('profiles',ProfileFunctions);
  }


  private registerComponent() {
    ComponentRegister.registerComponent("navbar",ScreenInfoComponent);
    ComponentRegister.registerComponent("grid",GridComponent);
    ComponentRegister.registerComponent("grid_toolbar",GridToolbarComponent);
    ComponentRegister.registerComponent("tabs",OptionButtonComponent);
  }


  private registerScreens() {
    ScreenRegister.addScreen("incoterm",new Incoterm());
    ScreenRegister.addScreen("location",new LocationMaster());
  }

  private registerToastTypes() {
    ToastService.registerType('error', '', '#E90000');
    ToastService.registerType('success', '', '#0080007F');
  }



  ngAfterViewInit(): void {
    this.registerComponent();
    this.loaded = true;
    this.cd.detectChanges();
    this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID,{environment:environment,screen:'location'});
  }

  toggleOptions() {
    this.screen = this.screen === 'physicalTrade' ? 'paperTrade' : 'physicalTrade';
    this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID, this.screen)
  }

  onItemChange(item: any) {
    console.log(item.profile)
    if(item.profile) {
      this.jsonToUIComponent.loadProfile(Profiles.SIMPLE_GRID, {environment:environment,screen:item.profile});
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
  }
}
