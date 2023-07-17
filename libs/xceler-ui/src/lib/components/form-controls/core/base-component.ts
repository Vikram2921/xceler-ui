import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
@Component({
  selector: 'xui-base-component',
  template: '',
})
export abstract class BaseComponent implements OnDestroy{

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
