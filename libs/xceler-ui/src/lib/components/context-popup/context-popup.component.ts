import { Component} from '@angular/core';

@Component({
  selector: 'xui-context-popup',
  templateUrl: './context-popup.component.html',
  styleUrls: ['./context-popup.component.css']
})
export class ContextPopupComponent {

  top:number = 0;
  left:number = 0;
  show: boolean = false;

  showContext(event: MouseEvent) {
    event.preventDefault();
    this.top = event.clientY;
    this.left = event.clientX;
    this.show = true;
  }
}
