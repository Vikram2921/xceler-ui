import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BaseComponent} from "../../form-controls/core/base-component";

@Component({
  selector: 'xui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent extends BaseComponent implements OnChanges,OnInit{

  @Input() totalPages:number = 0;
  @Input() selectedPage:number = 0;
  @Input() selectedRecords:number = 0;
  @Input() totalItems:number = 0;
  @Input() maxPageToShow:number  = 5;
  @Output() onPageChange = new EventEmitter<number>();
  pageArray:number[] = [];
  @Input() currentPageRecords: number = 0;


  jumpTo(number: any) {
    if(this.selectedPage !== number) {
      if(number <= 0) {
        number = 0;
      }
      if(number > this.totalPages) {
        number = this.totalPages;
      }
      this.selectedPage = number;
      this.onPageChange.emit(this.selectedPage)
    }
  }

  private updatePageArray() {
    this.pageArray = Array.from({length: this.totalPages}, (_, i) => i );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalPages']) {
      this.updatePageArray();
    }
  }

  ngOnInit(): void {
    this.updatePageArray();
  }

}
