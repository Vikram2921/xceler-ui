import {GridComponent} from "@xceler-ui/xceler-ui";

export class PageObject {
  private _content!:any[];
  private _size!:number;
  private _totalPages!:number;
  private _totalElements!:number;
  private _number!:number;
  private _numberOfElements!:number;


  get content(): any[] {
    return this._content;
  }

  set content(value: any[]) {
    this._content = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get numberOfElements(): number {
    return this._numberOfElements;
  }

  set numberOfElements(value: number) {
    this._numberOfElements = value;
  }
}
export interface Grid {
  selectedRows:any[];
  data:any[] | PageObject;
  beforeRender(grid:GridComponent):any;
}
