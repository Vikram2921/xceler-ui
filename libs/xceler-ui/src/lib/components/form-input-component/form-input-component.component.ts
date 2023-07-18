import {Component} from '@angular/core';
import {HostActivity} from "../../models/host-activity";
import {ScreenRegister} from "../../registers/screen-register.service";
import {Activity} from "../../interfaces/activity";
import {ColumnModel} from "../../models/column-model";
import {FormControlService} from "../../services/form-control.service";
import {ValidationField} from "./validation-box/validation-box.component";
import {StoreService} from "../../services/store.service";
import {FunctionRegister} from "../../registers/function-register.service";
import {FunctionParams} from "../../models/function-params";

@Component({
  selector: 'xui-form-input-component',
  templateUrl: './form-input-component.component.html',
  styleUrls: ['./form-input-component.component.css']
})
export class FormInputComponentComponent extends HostActivity{
  protected readonly isNaN = isNaN;
  activity!:Activity;
  currentFocusField = '';
  rowData!:{[key:string]:any};
  columns:ColumnModel[] = [];
  editMode = false;
  formControlService:FormControlService = new FormControlService();

  constructor() {
    super();
  }
  override init(props: { [p: string]: any }) {
    this.activity = ScreenRegister.getScreen(props['options'].screen);
    this.rowData = props['rowData'];
    this.editMode = (this.rowData !== null && this.rowData !== undefined);
    this.buildFormGroup();
  }

  getFormVisibleFields(columns:ColumnModel[]) {
    return columns.filter(column => ['B','F'].includes(<string>column.visibilityArea));
  }

  private getValueForForm(col:ColumnModel) {
    if(this.rowData) {
      return this.rowData[col.field];
    }
    return col.defaultValue;
  }

  private buildFormGroup() {
    this.columns = this.activity.screenJson.getColumns();
    const actionColumns:ColumnModel[] =[];
    const disabled:string[] =[];
    this.columns.forEach((col) => {
      this.formControlService.addControl(col.field,this.getValueForForm(col),col?.validators.map(name => FormControlService.getValidatorFromName(name)));
      if(col.listener !== undefined && col.listener){
        actionColumns.push(col);
      }
      if(col.disabled || (this.editMode && col.unique)){
          disabled.push(col.field);
      }
    })
    this.formControlService.build();
    actionColumns.forEach(actionColumn => {
      this.attachChangeListener(actionColumn);
    })
    disabled.forEach((name) => {
      this.formControlService.disable(name);
    })
  }

  private attachChangeListener(col:ColumnModel) {
    this.formControlService.attachChangeListener(col.field, FunctionRegister.getFunction(this.activity.screenJson.functionFile,(col.actionFunction && col.actionFunction.length > 0)?col.actionFunction:col.field),this.getFunctionParams(col),true)
  }

  getValidationSection() {
    const validationSection:{[key:string]:ValidationField[]} = {};
    if(this.activity.screenJson.sections && this.activity.screenJson.sections.length > 0) {
        this.activity.screenJson.sections.forEach(section => {
          validationSection[section.sectionName] = section.columns.map(col => new ValidationField(col.field,col.title,false,[]));
        })
    } else {
      validationSection['validation'] = this.activity.screenJson.columns.map(col => new ValidationField(col.field,col.title,false,[]));
    }
    return validationSection;
  }

  onFocusChange($event: string) {
    this.currentFocusField = $event;
  }

  protected readonly StoreService = StoreService;

  private getFunctionParams(col: ColumnModel) {
    const params = new FunctionParams();
    params.field = col;
    params.activity =this.activity;
    params.formControlService = this.formControlService;
    params.rowData = this.formControlService.getFormGroup().value;
    return params;
  }

  onClickButton(field: string) {
    const col = this.columns.find(item => item.field === field);
    if(col !== undefined) {
      FunctionRegister.callFunction(this.activity.screenJson.functionFile,field,this.getFunctionParams(col))
    }
  }
}
