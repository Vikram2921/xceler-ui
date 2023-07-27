import {ListOption} from "@xceler-ui/xceler-ui";

export class Resolver {
  public static getModifiedUrl(url: string, environment?: { [key: string]: any }, customInputs?: {
    [key: string]: any
  }) {
    let obj: any = Object.assign({
      "tenantId": localStorage.getItem("tenantId"),
      "username": localStorage.getItem("userName"),
      "size": 20
    }, environment ?? {});
    if (customInputs) {
      obj = Object.assign(obj, customInputs);
    }
    url = url.replace(/{(\w+)}/g, (match, p1) => {
      return obj[p1];
    });
    return url;
  };

  public static convertListStringToListOptions(list: any[], selectLabel: string = 'Select', selectValue: string = ''): ListOption[] {
    let finalList: ListOption[] = [];
    if (selectLabel && selectLabel.length > 0) {
      finalList.push(new ListOption(selectLabel, selectValue))
    }
    finalList = finalList.concat(list.map(item => new ListOption(item, item)));
    return finalList;
  }

  public static convertListObjectToListOptions(list: any[], labelField: string, valueField: string, selectLabel: string = 'Select', selectValue: string = ''): ListOption[] {
    let finalList: ListOption[] = [];
    if (selectLabel && selectLabel.length > 0) {
      finalList.push(new ListOption(selectLabel, selectValue))
    }
    finalList = finalList.concat(list.map(item => new ListOption(item[labelField], item[valueField])));
    return finalList;
  }

  public static maxZIndex(addExtra: number = 0): number {
    return <number>Array.from(document.querySelectorAll('body *'))
      .map(a => parseFloat(window.getComputedStyle(a).zIndex))
      .filter(a => !isNaN(a))
      .sort((a, b) => (a - b))
      .pop() + addExtra;
  }

  public static decidePopupPositionFromElement(element: HTMLElement, popupElement: HTMLElement) {
    const popupRect = popupElement.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();

    // Get the dimensions of the viewport
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (popupRect.right > (viewportWidth - 50)) {
      popupElement.style.left = `${targetRect.left - popupRect.width}px`;
    } else {
      popupElement.style.left = `${targetRect.right}px`;
    }
    if (popupRect.bottom > (viewportHeight - 50)) {
      popupElement.style.top = `${targetRect.bottom - popupRect.height}px`;
    } else {
      popupElement.style.top = `${targetRect.top}px`;
    }
  }

  public static decideDropdownPositionFromElement(element: HTMLElement, popupElement: HTMLElement) {
    const popupRect = popupElement.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    popupElement.style.left = `${targetRect.left}px`;
    if (popupRect.bottom > (viewportHeight - 50)) {
      popupElement.style.top = `${targetRect.top - popupRect.height}px`;
    } else {
      popupElement.style.top = `${targetRect.bottom}px`;
    }
  }

  public static decidePopupPositionFromEvent(event: MouseEvent, element: HTMLElement) {
    return this.decidePopupPositionFromElement(<HTMLElement>event.target, element);
  }


}
