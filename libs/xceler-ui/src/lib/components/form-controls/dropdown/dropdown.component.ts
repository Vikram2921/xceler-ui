import {
  Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges
} from '@angular/core';
import {BaseFormControl} from "../core/base-form-control";
import {ListOption} from "../core/list-option";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'xui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ]
})
export class DropdownComponent extends BaseFormControl implements  OnChanges {

  showList:boolean = false;
  @Input() searchable:boolean = false;
  @Output() onChangeOption = new EventEmitter();
  @Input() listOptions: ListOption[] = [new ListOption()];
  @Input() multiple:boolean = false;
  selectedOption!:ListOption| null;
  selectedOptions:ListOption[] = [];
  @Input() searchText: string = "";
  selectedValues:any[] =[];
  selectedLabels:any[] =[];
  @Input() ellipseAfter: number = 5;

  writeValue(obj: any): void {
    if(obj === null || obj === undefined) {
      return;
    }
    if(this.multiple && obj) {
      this.selectedValues = obj;
      this.selectedOptions = this.listOptions.filter(option => this.selectedValues.includes(option.value));
      this.selectedLabels = this.selectedOptions.map(option => option.label);
    }
    this.value = obj;
    this.preLoad(this.value);
  }

  toggleList() {
    this.showList = !this.showList;
  }

  onSelect(item: ListOption) {
    if(!this.multiple) {
      this.value = item.value;
      this.toggleList();
      this.selectedOption = item;
      this.selectedValues = [];
      this.selectedValues.push(item.value);
      this.onChangeOption.emit(item);
    } else {
      if(this.selectedValues.includes(item.value)) {
          const index = this.selectedValues.indexOf(item.value);
          this.selectedValues.splice(index, 1);
          this.selectedLabels.splice(index, 1);
          this.selectedOptions.splice(index, 1);
      } else {
        this.selectedOptions.push(item);
        this.selectedLabels.push(item.label);
        this.selectedValues.push(item.value);
      }
      this.value = this.selectedValues;
      this.onChangeOption.emit(this.selectedOptions);
    }

  }

  adjustDropdownPosition(dropList: ElementRef, dropdownHeader: HTMLDivElement) {
    if(dropList !== null && dropList !== undefined) {
      const dropdownRect = dropList.nativeElement.getBoundingClientRect();
      const headerRect = dropdownHeader.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const isOverflowingRight = dropdownRect.right > windowWidth;
      const isOverflowingLeft = dropdownRect.left < 0;
      const isOverflowingBottom = dropdownRect.bottom > windowHeight;
      const isOverflowingTop = headerRect.top - dropdownRect.height < 0;
      if (isOverflowingRight) {
        dropList.nativeElement.style.left = `${ 0 - dropdownRect.width}px`;
      } else if (isOverflowingLeft) {
        dropList.nativeElement.style.left = "0";
      } else {
        dropList.nativeElement.style.left = "";
      }

      if (isOverflowingBottom) {
        dropList.nativeElement.style.top = `${ headerRect.bottom - dropdownRect.height}px`;
      } else if (isOverflowingTop) {
        dropList.nativeElement.style.top = `${headerRect.height}px`;
      } else {
        dropList.nativeElement.style.top = "";
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['val'] || changes['value']) {
      this.preLoad(changes['val']?.currentValue || changes['value']?.currentValue)
    }
    if(changes['listOptions']) {
        if(changes['listOptions'].currentValue === null || changes['listOptions'].currentValue === undefined || changes['listOptions'].currentValue.length === 0) {
            this.listOptions = [new ListOption()];
        }
    }
  }

  private preLoad(value: any) {
    if(value === null || value === undefined || value === '') {
      this.selectedOption = this.listOptions[0];
      this.selectedValues = [];
      this.selectedValues.push(this.selectedOption.value);
    } else {
      this.selectedOption = this.listOptions.filter(item => item.value === value)[0];
      if(this.selectedOption) {
        this.selectedValues = [];
        this.selectedValues.push(this.selectedOption.value);
      }
    }
  }

  selectAll() {
    if(this.selectedValues.length == this.listOptions.length) {
      this.selectedOptions = [];
      this.selectedValues = [];
      this.selectedLabels = [];
    } else {
      this.selectedOptions = Object.assign([],this.listOptions);
      this.selectedValues = this.selectedOptions.map(i => i.value);
      this.selectedLabels = this.selectedOptions.map(i => i.label);
    }
    this.onChangeOption.emit(this.selectedOptions);
  }
}
