import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {Resolver} from "../../models/resolver";

@Component({
  selector: 'xui-context-popup',
  templateUrl: './context-popup.component.html',
  styleUrls: ['./context-popup.component.css']
})
export class ContextPopupComponent implements AfterViewInit{

  @Input() targetElement!: any;
  @Input() attachLeaveListener:boolean = true;

  event!:MouseEvent;
  show: boolean = false;

  showContext(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.event = event;
    this.show = true;
    if(this.attachLeaveListener) {
      this.attachMouseOut(event.target as HTMLElement);
    }
  }

  adjustPosition(element: ElementRef) {
    Resolver.decidePopupPositionFromEvent(this.event,element.nativeElement);
  }


  hide() {
      this.show = false;
  }

  private attachMouseOut(element:HTMLElement) {
    element.addEventListener("mouseleave",(event:any) => {
      this.hide();
    })
  }

  ngAfterViewInit(): void {
    if(this.targetElement) {
      let element = document.getElementById(this.targetElement);
      if(element) {
        element.addEventListener("mouseenter",(event:any) => {
          this.showContext(event);
        })
      }
    }
  }

  protected readonly Resolver = Resolver;
}
