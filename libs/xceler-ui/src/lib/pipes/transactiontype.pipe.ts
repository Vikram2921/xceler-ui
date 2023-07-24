import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType',
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string,element:HTMLElement) {
    if(value === "BUY") {
      element.style.background = "#aff2c185";
      element.style.color = "#1f9328";
    } else {
      element.style.background = "#f2c6af85";
      element.style.color = "#c3642d";
    }
    element.style.padding = "0.5rem";
    element.style.borderRadius = "0.2rem";
    element.style.width = "fit-content";
    element.style.textAlign="center";
    element.style.minWidth = "4rem";
    return value;
  }
}
