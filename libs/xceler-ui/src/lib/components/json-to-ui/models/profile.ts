export class ProfileItem {
  private _itemId!:string;
  private _componentId!:string;
  private _areaRowRange!:number[];
  private _rowWidth!:string;
  private _areaColRange!:number[];
  private _columnWidth!:string;
  private _padding!:string[];


  get padding(): string[] {
    return this._padding;
  }

  set padding(value: string[]) {
    this._padding = value;
  }

  get itemId(): string {
    return this._itemId;
  }

  set itemId(value: string) {
    this._itemId = value;
  }

  get componentId(): string {
    return this._componentId;
  }

  set componentId(value: string) {
    this._componentId = value;
  }

  get areaRowRange(): number[] {
    return this._areaRowRange;
  }

  set areaRowRange(value: number[]) {
    this._areaRowRange = value;
  }

  get rowWidth(): string {
    return this._rowWidth;
  }

  set rowWidth(value: string) {
    this._rowWidth = value;
  }

  get areaColRange(): number[] {
    return this._areaColRange;
  }

  set areaColRange(value: number[]) {
    this._areaColRange = value;
  }

  get columnWidth(): string {
    return this._columnWidth;
  }

  set columnWidth(value: string) {
    this._columnWidth = value;
  }
}

export class Profile {
  private _columns:number = 12;
  private _rows:number = 12;
  private _setupFunction!:string;
  private _rowHeightList:string[] = [];
  private _columnsWidthList:string[] = [];
  private _items: ProfileItem[] =[]

  get columns(): number {
    return this._columns;
  }

  set columns(value: number) {
    this._columns = value;
  }

  get rows(): number {
    return this._rows;
  }

  set rows(value: number) {
    this._rows = value;
  }

  get items(): ProfileItem[] {
    return this._items;
  }

  set items(value:ProfileItem[]) {
    this._items = value;
  }


  get rowHeightList(): string[] {
    return this._rowHeightList;
  }

  set rowHeightList(value: string[]) {
    this._rowHeightList = value;
  }

  get columnsWidthList(): string[] {
    return this._columnsWidthList;
  }

  set columnsWidthList(value: string[]) {
    this._columnsWidthList = value;
  }


  get setupFunction(): string {
    return this._setupFunction;
  }

  set setupFunction(value: string) {
    this._setupFunction = value;
  }


}
