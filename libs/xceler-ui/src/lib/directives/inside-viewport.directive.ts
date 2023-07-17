import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[insideViewport]'
})
export class InsideViewportDirective implements AfterViewInit {

  @Output() insideViewport = new EventEmitter();
  constructor(private elementRef: ElementRef) {
  }


  @HostListener('body:scroll', ['$event'])
  public onScrollBy(): any {
    this.checkIsInBound();
  }

  private checkIsInBound() {
    const windowHeight = window.innerHeight;
    const boundedRect = this.elementRef.nativeElement.getBoundingClientRect();
    if (boundedRect.top >= 0 && boundedRect.bottom <= windowHeight) {
      this.insideViewport.emit(this.elementRef);
    }
  }

  ngAfterViewInit(): void {
    this.insideViewport.emit(this.elementRef);
  }

}
