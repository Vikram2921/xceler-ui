import {ControlType} from "./control-type";
import {ListOption} from "../form-controls/core/list-option";

export class ColumnModel {
  field:string = '';
  title:string = '';
  type:ControlType | string = ControlType.TEXT_FIELD;
  validators:string[] = [];
  listener?:boolean = false;
  defaultValue?:any;
  list?:ListOption[];
  listStore?:string;
  visibilityArea?:string;
  unique:boolean =false;
  idField:boolean =false;
  min?:any;
  max?:any;
  colSpan:number = 1;
  disabled:boolean = false;
  pipe?:string;
  pipeOptions?:any;
  disableControlView:boolean =false;
}
