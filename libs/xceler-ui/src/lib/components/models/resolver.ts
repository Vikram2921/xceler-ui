import {ListOption} from "../form-controls/core/list-option";
import {environment} from "../../environment";

export class Resolver {
  public static getModifiedUrl(url:string,customInputs?:any,page?:number) {
    let obj:any = Object.assign({
      "tenantId": localStorage.getItem("tenantId"),
      "username": localStorage.getItem("userName"),
      "size":20,
      "page":page
    },environment);
    if(customInputs) {
        obj = Object.assign(obj,customInputs);
    }
    url = url.replace(/{(\w+)}/g, (match, p1) =>{
      return obj[p1];
    });
    return url;
  };

  public static convertListStringToListOptions(list:any[], selectLabel:string = 'Select', selectValue:string=''):ListOption[]{
    let finalList:ListOption[] =[];
    if(selectLabel && selectLabel.length > 0) {
        finalList.push(new ListOption(selectLabel,selectValue))
    }
    finalList = finalList.concat(list.map(item => new ListOption(item,item)));
    return finalList;
  }

  public static convertListObjectToListOptions(list:any[],labelField:string,valueField:string,selectLabel:string = 'Select',selectValue:string=''):ListOption[]{
    let finalList:ListOption[] =[];
    if(selectLabel && selectLabel.length > 0) {
      finalList.push(new ListOption(selectLabel,selectValue))
    }
    finalList = finalList.concat(list.map(item => new ListOption(item[labelField],item[valueField])));
    return finalList;
  }

  public static maxZIndex(addExtra:number = 0):number {
    return <number>Array.from(document.querySelectorAll('body *'))
      .map(a => parseFloat(window.getComputedStyle(a).zIndex))
      .filter(a => !isNaN(a))
      .sort((a, b) => (a - b))
      .pop() + addExtra;
  }


}
