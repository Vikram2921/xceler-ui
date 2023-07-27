import {Directive, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {HostActivity} from "../models/host-activity";
import {EventListener} from "../interfaces/event-listener";
import {PopupService} from "@xceler-ui/xceler-ui";
import {ComponentRegister} from "../registers/component-register.service";

@Directive({
  selector: '[loadComponent]'
})
export class LoadComponentDirective implements OnInit,EventListener{

  @Input() loadComponent!: Type<HostActivity>;
  @Input() props!:any;
  @Input() componentId!:string;
  @Input() initiate:boolean = true;
  constructor(private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(this.loadComponent);
    if(this.initiate) {
      componentRef.instance.init(this.props);
      componentRef.instance.id = this.componentId;
      componentRef.instance.popupStateListener = this;
    } else {
      ComponentRegister.registerElement(this.componentId,componentRef,this.props);
    }
  }

  onPopupClosed(popupId:string): void {
    PopupService.removePopup(popupId);
  }



}
