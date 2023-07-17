import { Injectable } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FunctionParams} from "../models/function-params";
import {pairwise} from "rxjs";

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  private formBuilder: FormBuilder;
  private formGroup!: FormGroup;
  private readonly formGroupObject: any;
  private newFormGroupObject: any;
  private fields: any[] = [];
  private defaultValues: any = {};
  constructor() {
    this.formBuilder = new FormBuilder();
    if (this.formGroupObject === null || this.formGroupObject === undefined) {
      this.formGroupObject = {};
      this.newFormGroupObject = {};
    }
  }

  addControl(field:string,value:any = '',validators: Validators = [],disabled:boolean = false) {
    this.defaultValues[field] = value;
    this.addInField(field);
    this.formGroupObject[field] = [{value:value,disabled:disabled},validators];
    this.newFormGroupObject[field] =this.formGroupObject[field];
    return this;
  }

  build() {
    let _this = this;
    if(this.formGroup !== null && this.formGroup !== undefined) {
      let config = { ...this.formGroup.controls};
      Object.keys(this.newFormGroupObject).forEach(function (key) {
        config[key] = _this.newFormGroupObject[key];
      });
      this.formGroup = this.formBuilder.group(config);
    } else {
      this.formGroup = this.formBuilder.group(this.formGroupObject);
    }
    this.newFormGroupObject = {};
    return this.formGroup;
  }

  addFormGroupControl(field:string,formGroup:FormGroup) {
    this.defaultValues[field] = formGroup;
    this.addInField(field);
    this.formGroupObject[field] = formGroup;
    this.newFormGroupObject[field] =this.formGroupObject[field];
    return this;
  }

  removeFormGroupControl(field:string) {
    this.defaultValues[field] = {};
    this.addInField(field);
    this.formGroupObject[field] = {};
    this.newFormGroupObject[field] =this.formGroupObject[field];
    return this;
  }

  private addInField(field:string) {
    if(!this.fields.includes(field)) {
      this.fields.push(field);
    }
  }

  updateValidators(field:string,validators:any =[]) {
    this.formGroup.controls[field].setValidators(validators);
    this.formGroup.controls[field].updateValueAndValidity();
  }

  disable(field:string,value?:any) {
    this.formGroup.controls[field].disable();
    if(value !== null && value !== undefined) {
        this.setValue(field,value);
    }
  }

  enable(field:string) {
    this.formGroup.controls[field].enable();
  }

  getValue(field: string) {
    return this.formGroup.controls[field].value;
  }


  reset() {
    this.formGroup.reset(this.defaultValues);
  }


  setValue(field: string, newValue: any) {
    if (this.formGroup.controls[field] !== null && this.formGroup.controls[field] !== undefined) {
      this.formGroup.controls[field].setValue(newValue);
      this.formGroup.controls[field].updateValueAndValidity();
    }
  }

  getFields() {
    return this.fields;
  }

  getFormGroup() {
    return this.formGroup;
  }

  static getAllErrors(formGroup:FormGroup) {
    let errorMessage:any = '';
    let _this = this;
    if(formGroup !== null && formGroup !== undefined) {
      let errors: any[] = [];
      let controls:any = formGroup.controls;
      if(controls !== null && controls !== undefined) {
        Object.keys(controls).forEach(key => {
          const controlErrors: ValidationErrors | null = formGroup.controls[key].errors;
          if (controlErrors !== null) {
            Object.keys(controlErrors).forEach(keyError => {
              errors.push({
                control_name: key,
                error_name: keyError,
                error_value: controlErrors[keyError]
              });
            });
          }
        })
      }
      errorMessage = FormControlService.extractErrors(errors);
    }
    return errorMessage;
  }

  static getAllErrorsFlat(key:string,formControl:AbstractControl) {
    let errorMessage:any = '';
    let errors: any[] = [];
    const controlErrors: ValidationErrors | null = formControl.errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({
          control_name: key,
          error_name: keyError,
          error_value: controlErrors[keyError]
        });
      });
    }
    errorMessage = FormControlService.extractErrors(errors);
    return errorMessage;
  }

  static extractErrors(errors: AllValidationErrors[]) {
    let text = '';
    if (errors != undefined && errors.length > 0) {
      for (const element of errors) {
        if (element) {
          switch (element.error_name) {
            case 'required':
              text += element.control_name + ' is required !';
              break;
            case 'pattern':
              text += element.control_name + ' has invalid pattern !';
              break;
            case 'email':
              text += element.control_name + ' invalid E-mail ID !';
              break;
            case 'minlength':
              text += 'Min Length for ' + element.control_name + ' is ' + element.error_value.requiredLength;
              break;
            case 'maxlength':
              text += 'Max Length for ' + element.control_name + ' is ' + element.error_value.requiredLength;
              break;
            case 'min':
              text += 'Min value for ' + element.control_name + ' is ' + element.error_value.min;
              break;
            case 'max':
              text += 'Min value for ' + element.control_name + ' is ' + element.error_value.max;
              break;
            case 'invalidReferenceFormat':
              text += element.error_value.message;
              break;
            default:
              text = element.control_name + ' ' + element.error_name + ' ' + element.error_value;
          }
          text += '\n';
        }
      }
    }
    return text;
  }

  hasControl(controlName: string): boolean {
    if (this.formGroup !== null && this.formGroup !== undefined) {
      return this.formGroup.contains(controlName);
    }
    return false;
  }

  attachChangeListener(field:string,functionToRun:Function | null,params:FunctionParams) {
    if(this.formGroup.contains(field) && functionToRun != null) {
      this.formGroup.controls[field].valueChanges.pipe(pairwise()).subscribe(next => {
        params.previousValue = next[0];
        params.currentValue = next[1];
        params.formGroup = this.formGroup;
        functionToRun(params);
      });
    }
  }

  static getValidatorFromName(name:string) {
    if(name == "required") {
      return Validators.required
    }
    return null;
  }
}
