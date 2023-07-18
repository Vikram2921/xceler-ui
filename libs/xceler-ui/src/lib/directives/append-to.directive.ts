import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[xuiAppendTo]',
})
export class AppendToDirective implements OnInit{

  @Input('xuiAppendTo') targetSelector!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.targetSelector) {
      this.renderer.appendChild(this.targetSelector, this.el.nativeElement);
    } else {
      console.error(`Target element with selector '${this.targetSelector}' not found.`);
    }
  }
}
