import {ColumnModel} from "./column-model";
import {FormGroup} from "@angular/forms";
import {FormControlService} from "../services/form-control.service";

export class FunctionParams {
  field?:ColumnModel;
  formGroup?:FormGroup;
  rowData?:any;
  currentValue!:string;
  previousValue!:string;
  formControlService!:FormControlService;
}
