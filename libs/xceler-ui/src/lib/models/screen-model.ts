import {ColumnModel} from "./column-model";

export class Tabs {
    label!: string;
    selected!: boolean;
    useSameModel!: boolean;
    modelName!:string;
}

export class ScreenModel {
  urls: {
    saveUrl: string,
    fetchUrl: string
    hrefUrl: string,
    updateUrl: string,
    deleteUrl: string,
    importUrl: string
  } = {
    saveUrl: "",
    fetchUrl: "",
    hrefUrl: "",
    updateUrl: "",
    deleteUrl: "",
    importUrl: ""
  };
  gridConfiguration: {
    checkbox: boolean
    canAdd: boolean,
    canEdit: boolean,
    canCopy: boolean,
    canDelete: boolean,
    canExport: boolean,
    canImport: boolean
  } = {
    canAdd: true,
    canCopy: true,
    canDelete: true,
    canEdit: true,
    canExport: true,
    canImport: true,
    checkbox: true
  };
  tabs: Tabs[] = [];
  sections!: {"sectionName":string,columns:ColumnModel[]}[];
  columns: ColumnModel[] = [];
  title: string = "";
  functionFile!:string;
  iconPath:string = "";
  options:{[key:string]:any}= {};
  getColumns() {
    if(this.sections && this.sections.length > 0) {
      let columns:ColumnModel[] =[];
      this.sections.forEach(section => {
        columns = columns.concat(section.columns);
      })
      return columns;
    } else {
      return this.columns;
    }
  }

  addOption(key:string,value:any) {
    this.options[key] = value;
  }

  getOption(key:string) {
      return this.options[key];
  }
}
