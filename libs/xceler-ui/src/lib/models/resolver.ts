import {ListOption} from "@xceler-ui/xceler-ui";

export class Resolver {
  public static getModifiedUrl(url:string,environment?:{[key:string]:any},customInputs?:{[key:string]:any}) {
    let obj:any = Object.assign({
      "tenantId": localStorage.getItem("tenantId"),
      "username": localStorage.getItem("userName"),
      "size":20
    },environment??{});
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

  public static decidePopupPositionFromElement(element:HTMLElement) {
      let popupPosition:any = {};
      let elementPosition = element.getBoundingClientRect();
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      popupPosition.top = elementPosition.top + element.offsetHeight;
      popupPosition.left = elementPosition.left;
      if(popupPosition.top + element.offsetHeight > windowHeight) {
          popupPosition.top = elementPosition.top - element.offsetHeight;
      }
      if(popupPosition.left + element.offsetWidth > windowWidth) {
          popupPosition.left = windowWidth - element.offsetWidth;
      }
      return popupPosition;
  }

  public static decidePopupPositionFromEvent(event:MouseEvent) {
      let popupPosition:any = {};
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      popupPosition.top = event.clientY;
      popupPosition.left = event.clientX;
      if(popupPosition.top + 100 > windowHeight) {
          popupPosition.top = event.clientY - 100;
      }
      if(popupPosition.left + 100 > windowWidth) {
          popupPosition.left = windowWidth - 100;
      }
      return popupPosition;
  }


}
