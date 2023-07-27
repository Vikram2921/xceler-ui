import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {Activity} from "../../interfaces/activity";
import {GridConfiguration, ScreenModel} from "../../models/screen-model";
import {ColumnModel} from "../../models/column-model";
import {ApiService} from "../../services/api-service.service";
import {StorageService} from "../../services/storage.service";
import {ToastService} from "../toaster/service/toast.service";
import {HostActivity} from "../../models/host-activity";
import {PageObject} from "../../interfaces/grid";
import {StoreService} from "../../services/store.service";

export class GridConfig {
  checkbox!: boolean;
  actions!: boolean;
  height!: string;
}

@Component({
  selector: 'xui-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent extends HostActivity {

  title: any = 'Default';
  columns: ColumnModel[] = [];
  gridColumns: ColumnModel[] = [];
  screenModel!: ScreenModel | null;
  activity!: Activity | null;
  showGrid: boolean = false;
  refreshing: boolean = false;
  editingRows: number[] = [];
  currentPage: number = 0;
  rows: any[] = [];
  page!: PageObject | null;
  gridConfig!: GridConfig | null;
  @Output() onChangeValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPageChange: EventEmitter<number> = new EventEmitter()
  @Output() onFieldClick: EventEmitter<{ col: ColumnModel, row: { [key: string]: any } }> = new EventEmitter<{
    col: ColumnModel,
    row: { [key: string]: any }
  }>();

  override reset() {
    this.title = '';
    this.columns = [];
    this.gridColumns = [];
    this.screenModel = null;
    this.activity = null;
    this.showGrid = false;
    this.refreshing = false;
    this.editingRows = [];
    this.currentPage = 0;
    this.rows = [];
    this.page = null;
    this.gridConfig = null;

  }


  constructor(public apiService: ApiService, public storageService: StorageService, private cd: ChangeDetectorRef) {
    super();
  }

  show(activity: Activity, json?: any, gridConfig?: GridConfig) {
    this.reset();
    this.activity = activity;
    activity.beforeRender(this);
    this.gridConfig = gridConfig ?? this.getDefaultGridConfig();
    if (json !== null && json !== undefined) {
      this.loadJson(json);
    }
  }

  private getDefaultGridConfig() {
    let gridConfig = new GridConfig();
    gridConfig.checkbox = true;
    gridConfig.actions = true;
    gridConfig.height = '100%';
    return gridConfig;
  }

  showFromColumnModels(columns: ColumnModel[], gridConfig?: GridConfig) {
    this.gridConfig = gridConfig ?? this.getDefaultGridConfig();
    this.gridColumns = columns;
    this.showGrid = true;
    this.cd.detectChanges();
  }

  setData(data: any[], page?: PageObject) {
    this.rows = data;
  }

  loadJson(screenModel: ScreenModel) {
    if (!screenModel.gridConfiguration) {
      screenModel.gridConfiguration = new GridConfiguration();
    }
    this.screenModel = screenModel;
    this.title = screenModel.title;
    if (screenModel.sections && screenModel.sections.length > 0) {
      let cols: ColumnModel[] = [];
      screenModel.sections.forEach(section => {
        let columns = section.columns;
        cols = cols.concat(columns)
      });
      this.columns = cols;
    } else {
      this.columns = screenModel.columns;
    }
    this.gridColumns = this.columns.filter(col => col.visibilityArea !== undefined && ['B', 'G'].includes(col.visibilityArea));
    this.showGrid = true;
  }

  onClickButton(title: string, index: number) {
    if (title == 'Edit') {
      if (this.editingRows.length > 0) {
        ToastService.addErrorMessage('Error While Deleting', "Please save all rows before copy.")
        return;
      }
      this.editingRows.push(index);
    } else if (title == 'Save') {
      this.editingRows.splice(this.editingRows.indexOf(index), 1);
    } else if (title == 'Undo') {
      this.editingRows.splice(this.editingRows.indexOf(index), 1);
    } else if (title == 'Copy') {
      if (this.editingRows.length > 0) {
        ToastService.addErrorMessage('Error While Copying', "Please save all rows before copy.")
        return;
      }
      let newRow = Object.assign({}, this.rows[index]);
      this.rows.splice(0, 0, newRow);
      this.editingRows.push(0);
    } else if (title == 'Delete') {
      if (this.editingRows.length > 0) {
        ToastService.addErrorMessage('Error While Deleting', "Please save all rows before copy.")
        return;
      }
      this.rows.splice(index, 1);
    }
    this.activity!.onButtonClick(title);
  }

  toggleAll() {
    if (this.activity!.selectedRows.length === this.rows.length) {
      this.activity!.selectedRows = [];
    } else {
      this.activity!.selectedRows = Object.assign([], this.rows);
    }
  }

  toggleSingle(row: any) {
    if (this.activity!.selectedRows.indexOf(row) === -1) {
      this.activity!.selectedRows.push(row);
    } else {
      this.activity!.selectedRows.splice(this.activity!.selectedRows.indexOf(row), 1);
    }
  }

  refreshData() {
    this.refreshing = true;
    if (!Array.isArray(this.activity!.data)) {
      this.page = this.activity!.data;
      this.rows = this.page.content;
    } else {
      this.rows = this.activity!.data;
    }
  }

  onChangePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onPageChange.emit(pageNumber);
  }

  protected readonly StoreService = StoreService;

  onClickClickableField(col: ColumnModel, row: { [key: string]: any }) {
    if (col.idField) {
      this.onFieldClick.emit({col: col, row: row})
    }
  }
}
