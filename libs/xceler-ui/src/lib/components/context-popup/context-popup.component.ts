import {AfterViewInit, Component, Input} from '@angular/core';
import {Resolver} from "../../models/resolver";

@Component({
  selector: 'xui-context-popup',
  templateUrl: './context-popup.component.html',
  styleUrls: ['./context-popup.component.css']
})
export class ContextPopupComponent implements AfterViewInit{

  @Input() targetElement!: any;

  top:number = 0;
  left:number = 0;
  show: boolean = false;

  showContext(event: MouseEvent,position:string = "right") {
    event.preventDefault();
    event.stopPropagation();
    let pos = Resolver.decidePopupPositionFromEvent(event);
    this.top = pos.top;
    this.left = pos.left;
    this.show = true;
  }

  hide() {
      this.show = false;
  }

  ngAfterViewInit(): void {
    if(this.targetElement) {
      let element = document.getElementById(this.targetElement);
      if(element) {
        let pos = Resolver.decidePopupPositionFromElement(element);
        console.log(pos);
        element.addEventListener("mouseenter",(event:any) => {
          this.showContext(event,'top');
        })
      }

      this.targetElement.onmouseover = (event:MouseEvent) => {
        this.hide();
      }

    }
  }

  protected readonly Resolver = Resolver;
}
