import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(value: any[], args: any,key:any = 'label'): any {
    if(!value) return null;
    if(!args) return value;
    args = args.toLowerCase();
    return value.filter(function(item){
      return  (key !== null && key !== undefined && key.length > 0)?item[key].toLowerCase().includes(args):JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
