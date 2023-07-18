import {ColumnModel} from "./column-model";
import {FormGroup} from "@angular/forms";
import {FormControlService} from "../services/form-control.service";
import {Activity} from "../interfaces/activity";

export class FunctionParams {
  field?:ColumnModel;
  formGroup?:FormGroup;
  rowData?:any;
  currentValue!:string;
  previousValue!:string;
  activity!:Activity;
  formControlService!:FormControlService;
  firstChange:boolean = false;
}
