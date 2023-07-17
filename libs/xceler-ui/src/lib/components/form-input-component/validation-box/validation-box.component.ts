import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {FormControlService} from "../../../services/form-control.service";

export class ValidationField {
    field!: string;
    header!: string;
    grid!: boolean;
    fields!: any[];


  constructor(field: string, header: string, grid: boolean, fields: any[]) {
    this.field = field;
    this.header = header;
    this.grid = grid;
    this.fields = fields;
  }
}

@Component({
  selector: 'validation-box',
  templateUrl: './validation-box.component.html',
  styleUrls: ['./validation-box.component.css']
})
export class ValidationBoxComponent implements OnChanges{

  @Input() validationSections!: {[key: string]: ValidationField[]};
  @Input() formGroup!:FormGroup;
  focusedSection: string =  '';
  @Input() focusedField: string = '';
  currentlyFocusedField: string = '';

  getKeys() {
    return Object.keys(this.validationSections);
  }

  goToField(field: string, section: string) {
    this.focusedSection = section;
    this.focusedField = field;
    document.getElementById(field)?.focus();
    document.getElementById(field)?.scrollTo({behavior:'smooth'});
  }

  getIconFromValidations(formGroup: FormGroup, fields: ValidationField[]): boolean {
    let isValid: boolean = true;
    if (formGroup) {
      fields.forEach((field: ValidationField) => {
        if (field.grid) {
          if (field.field !== '') {
            let formControl: any = formGroup.controls[field.field];
            if (FormControlService.getAllErrorsFlat(field.field, formControl).length > 0) {
              isValid = false;
            }
          }
        } else {
          if (field.field !== '') {
            let formControl: any = formGroup.controls[field.field];
            if (!formControl.valid && !formControl.disabled) {
              isValid = false;
            }
          }
        }
      });
    }
    return isValid;
  }

  hasErrors(field: any) {
    return Object.keys(field).length > 0;

  }

  getErrors(field:any) {
    return FormControlService.getAllErrorsFlat(field.field,this.formGroup.controls[field.field]);
  }

  getKeysFromObject(obj:any) {
    return Object.keys(obj);
  }

  getHeader(field: any, error: string) {
    let num:any[] | null = new RegExp(/\d+$/).exec(error);
    if(num) {
      error = error.replace(/\d+$/, "")
      return field.fields[error]+' in row '+(parseInt(num[0])+1);
    }
    return '';
  }

  isHidden(field:any) {
    return field !== ''?(!this.isErrorInField(this.formGroup,field.field) || (this.getValidationErrorMessage(this.formGroup.controls[field.field], field.header).length === 0)):true;
  }
  isErrorInField(formGroup: FormGroup, field: any) {
    if(formGroup !== null && formGroup !== undefined) {
      return !formGroup.controls[field].valid;
    }
    return false;
  }

  getValidationErrorMessage(formControl:AbstractControl, header:string) {
    let errorMessage = '';
    if(formControl !== null && formControl !== undefined) {
      let errors: any[] = [];
      const controlErrors: ValidationErrors | null = formControl.errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: header,
            error_name: keyError,
            error_value: controlErrors[keyError]
          });
        });
      }
      errorMessage = FormControlService.extractErrors(errors);
    }
    return errorMessage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['focusedField'] && changes['focusedField'].currentValue !== changes['focusedField'].previousValue) {
        this.currentlyFocusedField = changes['focusedField'].currentValue;
        Object.keys(this.validationSections).forEach((key) => {
          let field = this.validationSections[key].find(item => item.field === this.currentlyFocusedField);
          if(field) {
            this.focusedSection = key;
          }
        })
    }
  }

}
