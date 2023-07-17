export class ListOption {
  private _label!: string;
  private _value!: any;
  private _extra!:any
  private _selectedIcon!:any;
  private _defaultIcon!:any;


  constructor(label: string = 'Select', value: any = '', extra?: any, selectedIcon?: any, defaultIcon?: any) {
    this._label = label;
    this._value = value;
    this._extra = extra;
    this._selectedIcon = selectedIcon;
    this._defaultIcon = defaultIcon;
  }


  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  get extra(): any {
    return this._extra;
  }

  set extra(value: any) {
    this._extra = value;
  }

  get selectedIcon(): any {
    return this._selectedIcon;
  }

  set selectedIcon(value: any) {
    this._selectedIcon = value;
  }

  get defaultIcon(): any {
    return this._defaultIcon;
  }

  set defaultIcon(value: any) {
    this._defaultIcon = value;
  }
}
