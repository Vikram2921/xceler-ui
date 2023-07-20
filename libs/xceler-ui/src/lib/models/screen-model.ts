import {ColumnModel} from "./column-model";

export class UrlModel {
  method!: string;
  url!: string;
  data?: any;
  payloadFunction!: string;
}

export class Urls {
  saveUrl!: UrlModel;
  fetchUrl!: UrlModel;
  hrefUrl!: UrlModel;
  updateUrl!: UrlModel;
  deleteUrl!: UrlModel;
  importUrl!: UrlModel;
}

export class Tabs {
  label!: string;
  selected!: boolean;
  useSameModel!: boolean;
  modelName!: string;
  urls!: Urls;
  payloadFunction!: string
}

export class GridConfiguration {
  checkbox: boolean
  canAdd: boolean
  canEdit: boolean
  canCopy: boolean
  canDelete: boolean
  canExport: boolean
  canImport: boolean


  constructor(checkbox: boolean = true, canAdd: boolean = true, canEdit: boolean = true, canCopy: boolean = true, canDelete: boolean = true, canExport: boolean = true, canImport: boolean = true) {
    this.checkbox = checkbox;
    this.canAdd = canAdd;
    this.canEdit = canEdit;
    this.canCopy = canCopy;
    this.canDelete = canDelete;
    this.canExport = canExport;
    this.canImport = canImport;
  }
}

export class ScreenModel {
  urls!: Urls;
  gridConfiguration: GridConfiguration = new GridConfiguration();
  tabs: Tabs[] = [];
  sections!: { "sectionName": string, columns: ColumnModel[] }[];
  columns: ColumnModel[] = [];
  title: string = "";
  functionFile!: string;
  iconPath: string = "";
  options: { [key: string]: any } = {};

  getColumns() {
    if (this.sections && this.sections.length > 0) {
      let columns: ColumnModel[] = [];
      this.sections.forEach(section => {
        columns = columns.concat(section.columns);
      })
      return columns;
    } else {
      return this.columns;
    }
  }

  addOption(key: string, value: any) {
    this.options[key] = value;
  }

  getOption(key: string) {
    return this.options[key];
  }
}
