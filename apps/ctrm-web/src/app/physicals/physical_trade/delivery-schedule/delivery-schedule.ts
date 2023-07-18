import {DatePipe} from "@angular/common";
import {ApiService, Resolver} from "@xceler-ui/xceler-ui";

export class DeliverySchedule {

  private static datePipe: DatePipe = new DatePipe('en-US');

  static getDeliveryList(data: any, internalPackage: any = null) {
    let quantity = 1;
    let requiredFields = ["quantityUom", "quantityPeriodicity", "periodStartDate", "periodEndDate"];
    let bulkFields: string[] = ["quantity"]
    let containerFields: string[] = ["internalPackage", "internalPackageUnit"]
    let check: boolean = true;
    requiredFields.forEach(e => {
      if (data[e] == null || data[e] == "") check = false;
    })
    if (data['packageType'] === 'Unit') {
      containerFields.forEach(e => {
        if (data[e] == null || data[e] == "") check = false;
      })
    } else if (data['packageType'] === 'Bulk') {
      bulkFields.forEach(e => {
        if (data[e] == null || data[e] == "") check = false;
      })
    }
    if (!check) return {value: [], total: 0, totalNumberOfUnit: 0};

    if (data['packageType'] === 'Unit' && internalPackage != null) {
      quantity = internalPackage['quantity'];
    }
    let value: any[] = [];
    let totalNumberOfUnit: number;
    let total = this.getTotalObligations(data['quantityPeriodicity'], data['periodStartDate'], data['periodEndDate']);
    let records = data['deliverySchedule'];
    if (records !== null && records !== undefined && records.length > 0) {
      value = Object.assign([], records);
    } else {
      for (let i = 0; i < total; i++) {
        value.push(this.getLineItem(data, i, quantity, value));
      }
    }
    total = value
      .map((item: any) => parseFloat(item.quantity))
      .reduce((sum: number, current: number) => sum + current, 0);

    totalNumberOfUnit = value
      .map((item: any) => parseFloat(item.noOfUnits))
      .reduce((sum: number, current: number) => sum + current, 0);
    return {value: value, total: total, totalNumberOfUnit: totalNumberOfUnit}
  }

  private static getTotalObligations(qtyPeriodicity: string, deliveryStartDate: string, deliveryEndDate: string) {
    return this.calculateTotalContractQuantity(1, qtyPeriodicity, deliveryStartDate, deliveryEndDate);
  }

  private static calculateTotalContractQuantity(quantity: number, periodicity: string, startDate: any, endDate: any) {
    let num: number = 0;
    if (quantity !== undefined && periodicity !== undefined && periodicity !== '') {
      if (periodicity.toLowerCase() === 'fixed') {
        num = quantity;
      } else {
        if (endDate !== '' && startDate !== '') {
          switch (periodicity.toLowerCase()) {
            case 'daily':
              num = quantity * this.numberOfDaysBetween(new Date(startDate), new Date(endDate));
              break;
            case 'weekly':
              num = quantity * this.numberOfWeeks(new Date(startDate), new Date(endDate));
              break;
            case 'monthly':
              num = quantity * this.numberOfMonths(new Date(startDate), new Date(endDate));
              break;
            case 'quarterly':
              num = quantity * this.numberOfQuaters(new Date(startDate), new Date(endDate));
              break;
            case 'yearly':
              num = quantity * this.numberOfYears(new Date(startDate), new Date(endDate));
              break;
            case 'halfyearly':
              num = quantity * (this.numberOfYears(new Date(startDate), new Date(endDate)) * 2);
              break;
          }
        }
      }
    }
    return num;
  }

  private static numberOfDaysBetween(date1: Date, date2: Date) {
    let differenceInDays = 0;
    if (date1 !== null && date2 !== null) {
      let differenceInTime = new Date(date2.toString()).getTime() - new Date(date1.toString()).getTime();
      differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return Math.ceil(differenceInDays) + 1;
    }
    return differenceInDays + 1;
  }

  private static numberOfWeeks(date1: Date, date2: Date) {
    return Math.ceil(this.numberOfDaysBetween(date1, date2) / 7);
  }

  private static numberOfQuaters(date1: Date, date2: Date) {
    if (this.numberOfMonths(date1, date2) <= 3) {
      return 1;
    }
    return Math.ceil(this.numberOfMonths(date1, date2) / 3);
  }

  private static numberOfYears(date1: Date, date2: Date) {
    if (date2.getFullYear() - date1.getFullYear() < 1)
      return 1;
    return Math.abs(date2.getFullYear() - date1.getFullYear()) + 1;
  }

  private static numberOfMonths(date1: Date, date2: Date) {
    let months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return Math.abs(months) + 1;
  }

  static quantityCalculation(data: { [key: string]: any }) {
    let unitObj: any = {};
    unitObj['packageType'] = "Unit";
    unitObj['internalPackageUnit'] = data['internalPackageUnit'];
    unitObj['commodity'] = data['commodity'];
    unitObj['quantityUom'] = data['quantityUom'];
    unitObj['internalPackageName'] = data['internalPackage'];
    return ApiService.post(Resolver.getModifiedUrl('{endpoint}/ctrm-api/api/externalpackage/v1/quantityandunitconversion?tenantId={tenantId}'), unitObj);
  }

  private static getLineItem(data: any, index: number, quantity: number, value: any[]) {
    if (index === 0) {
      return this.getObligationObject(
        this.calculateDeliveryStartDate(
          data['periodStartDate'],
          data['quantityPeriodicity']
        ),
        quantity,
        data
      );
    } else {
      return this.getObligationObject(
        this.addDaysInDate(
          new Date(value[index - 1]['periodEndDate']),
          1
        ),
        quantity,
        data
      );
    }
  }

  private static getObligationObject(startDate: Date, quantity: any, data: any) {
    let object: any = {};
    object['periodStartDate'] = this.convertDateToUTC(startDate);
    object['periodEndDate'] = (this.calculateDeliveryEndDate(data['quantityPeriodicity'].toLowerCase() === 'fixed' ? data['periodEndDate'] : startDate, data['quantityPeriodicity']));
    object['packageType'] = data['packageType'];
    object['shipDelMonth'] = this.getFormattedDate(object['periodEndDate'], 'MMMM-yy');
    if (data['packageType'] === 'Bulk') {
      object['noOfUnits'] = 1;
      object['quantity'] = data['quantity'];
      object['package'] = '';
    } else if (data['packageType'] === 'Unit') {
      object['noOfUnits'] = data['internalPackageUnit'];
      object['quantity'] = quantity;
      object['package'] = data['externalPackage'];
    }
    object['uuid'] = '';
    return JSON.parse(JSON.stringify(object));
  }

  private static calculateDeliveryEndDate(selectedDate: any, periodicity: any) {

    if (periodicity.toLowerCase() === 'fixed') {
      return selectedDate;
    } else if (periodicity.toLowerCase() === 'daily') {
      return selectedDate;
    } else if (periodicity.toLowerCase() === 'weekly') {
      let date = new Date(selectedDate.toString());
      if (date.toString().split(' ')[0] !== 'Sat') {
        return this.nextDayFromDate(date, 6);
      }
      return selectedDate;
    } else if (periodicity.toLowerCase() === 'monthly') {
      let date = new Date(selectedDate.toString());
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      return date;
    } else if (periodicity.toLowerCase() === 'quarterly') {
      let date = new Date(selectedDate.toString());
      let quarter = Math.floor((date.getMonth() + 3) / 3);
      if (quarter === 1) {
        return new Date(date.getFullYear(), 3, 0);
      } else if (quarter === 2) {
        return new Date(date.getFullYear(), 6, 0);
      } else if (quarter === 3) {
        return new Date(date.getFullYear(), 9, 0);
      } else if (quarter === 4) {
        return new Date(date.getFullYear(), 12, 0);
      }
    } else if (periodicity.toLowerCase() === 'yearly') {
      let date = new Date(selectedDate.toString());
      return new Date(date.getFullYear(), 12, 0);
    } else if (
      periodicity.toLowerCase().replace(/ /g, '') ===
      'halfyearly'
    ) {
      return selectedDate;
    }
  }

  private static convertDateToUTC(dateToConvert: any) {
    if (typeof dateToConvert == 'string') {
      dateToConvert = new Date(dateToConvert);
    }
    let date: Date = new Date(dateToConvert + 'UTC');
    let dt = this.getFormattedDateTime(date, 'yyyy-MM-ddTHH:mm:ss');
    return dt === null ? '' : dt.toString().replace('Z', '');
  }

  private static addDaysInDate(date: Date, daysToAdd: number) {
    let finalDate = date;
    finalDate.setDate(date.getDate() + daysToAdd);
    return finalDate;
  }

  private static getFormattedDate(value: any, format: string = "dd MMM yyyy") {
    return this.datePipe.transform(value, format);
  }

  private static getFormattedDateTime(date: Date, format = 'dd MMM yyyy') {
    if (date !== undefined && date !== null && date.toString() !== 'Invalid Date') {
      return this.datePipe.transform(date, format, 'UTC');
    }
    return '';
  }

  private static calculateDeliveryStartDate(selectedDate: Date, periodicity: string) {
    if (periodicity.toLowerCase() === 'fixed') {
      return selectedDate;
    } else if (periodicity.toLowerCase() === 'daily') {
      return selectedDate;
    } else if (periodicity.toLowerCase() === 'weekly') {
      let date = new Date(selectedDate.toString());
      if (date.toString().split(' ')[0] !== 'Sun') {
        date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - 1
        );
      }
      return selectedDate;
    } else if (periodicity.toLowerCase() === 'monthly') {
      let date = new Date(selectedDate.toString());
      date.setDate(1);
      return date;
    } else if (periodicity.toLowerCase() === 'quarterly') {
      let date = new Date(selectedDate.toString());
      let quarter = Math.floor((date.getMonth() + 3) / 3);
      if (quarter === 1) {
        return new Date(date.getFullYear(), 0, 1);
      } else if (quarter === 2) {
        return new Date(date.getFullYear(), 3, 1);
      } else if (quarter === 3) {
        return new Date(date.getFullYear(), 6, 1);
      } else {
        return new Date(date.getFullYear(), 9, 1);
      }
    } else if (periodicity.toLowerCase() === 'yearly') {
      let date = new Date(selectedDate.toString());
      date.setDate(1);
      date.setMonth(0);
      return date;
    } else {
      return selectedDate;
    }
  }

  private static nextDayFromDate(date: Date, dayCode: number = 0) {
    let arr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dateDay = date.toString().split(' ')[0];
    return this.addDaysInDate(date, Math.abs(arr.indexOf(dateDay) - dayCode));
  }

}
