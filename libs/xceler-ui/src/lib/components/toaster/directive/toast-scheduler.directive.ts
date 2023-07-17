import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ToastService} from "../service/toast.service";

@Directive({
  selector: '[toastScheduler]'
})
export class ToastSchedulerDirective implements OnInit{

  @Input() toastScheduler:number = 5000;
  @Input() toastService!:ToastService;
  @Output() onTimeOut = new EventEmitter();
  @Input() schedule:boolean = false;
  private sessionId?:any = -1;

  @HostListener("mouseover")
  private onMouseOver() {
    if(this.sessionId != -1) {
      clearTimeout(this.sessionId);
      this.sessionId = -1;
    }
  }

  @HostListener("mouseleave")
  private onMouseOut() {
    if(this.sessionId != -1) {
      clearTimeout(this.sessionId);
      this.sessionId = -1;
    }
    this.start();
  }


  constructor(private element:ElementRef) {
  }

  ngOnInit(): void {
    this.start();
  }

  private start() {
    if(this.schedule) {
      this.sessionId = setTimeout(() => {
        this.onTimeOut.emit();
      }, this.toastScheduler)
    }
  }
}
