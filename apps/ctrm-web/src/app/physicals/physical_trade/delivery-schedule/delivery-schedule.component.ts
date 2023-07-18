import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DeliverySchedule} from "./delivery-schedule";
import {FormGroup} from "@angular/forms";
import {ColumnModel, ControlType, GridComponent, GridConfig, HostActivity} from "@xceler-ui/xceler-ui";
import {environment} from "../../../environment";

@Component({
  selector: 'app-delivery-schedule',
  templateUrl: './delivery-schedule.component.html',
  styleUrls: ['./delivery-schedule.component.css']
})
export class DeliveryScheduleComponent extends HostActivity implements AfterViewInit,OnInit{

  @ViewChild(GridComponent) grid!:GridComponent;
  columns:ColumnModel [] = [];
  totalUnits: number = 0;
  totalQuantity: number = 0;
  rowData:any;
  formGroup!:FormGroup;
  deliverySchedule:any[] =[];
  constructor(private cd:ChangeDetectorRef) {
    super();
  }
  override init(props: { [p: string]: any }) {
    this.rowData = props['rowData'];
    this.formGroup = props['formGroup'];
  }

  ngAfterViewInit(): void {
    let gridConfig = new GridConfig();
    gridConfig.checkbox = false;
    gridConfig.actions = false;
    gridConfig.height = "400px";
    this.grid.showFromColumnModels(this.columns,gridConfig);
    if(this.rowData['packageType'].toLowerCase() === 'unit') {
      DeliverySchedule.quantityCalculation(this.rowData,environment).then((next) => {
        this.calculateDeliverySchedule(next);
      })
    } else {
      this.calculateDeliverySchedule(null);
    }
    this.grid.onChangeValue.subscribe((next) => {
      this.calculateTotal();
    });

  }

  private calculateDeliverySchedule(internalPackage:any){
    let resp = DeliverySchedule.getDeliveryList(this.rowData,internalPackage)
    this.deliverySchedule = resp.value;
    this.totalQuantity = resp.total;
    this.totalUnits = resp.totalNumberOfUnit;
    this.grid.setData(this.deliverySchedule);
    this.grid.editingRows = Array.from(Array(this.deliverySchedule.length), (_, index) => index);
    this.cd.detectChanges();
  }

  private getColumn(field:string = "", header:string = "",type:ControlType=ControlType.LABEL,disabled:boolean = false) {
    let column:ColumnModel = new ColumnModel();
    column.field = field;
    column.title = header;
    column.type = type;
    column.disabled = disabled;
    column.disableControlView = true;
    if(column.type == ControlType.DATEPICKER) {
      column.pipe = "dateFormat"
      column.pipeOptions = {"format":"dd MMM yyyy"}
    }
    return column;
  }

  ngOnInit(): void {
    this.columns = [];
    this.columns.push(this.getColumn('shipDelMonth','Ship/Del Month',ControlType.LABEL,true));
    this.columns.push(this.getColumn('periodStartDate','Start Date',ControlType.DATEPICKER,true));
    this.columns.push(this.getColumn('periodEndDate','End Date',ControlType.DATEPICKER,true));
    this.columns.push(this.getColumn('noOfUnits','# of Units/Period',ControlType.NUMBER_FIELD));
    this.columns.push(this.getColumn('quantity','Quantity/Period',ControlType.NUMBER_FIELD));
  }


  private calculateTotal() {
    this.totalQuantity = this.deliverySchedule
      .map((item: any) => parseFloat(item.quantity))
      .reduce((sum: number, current: number) => sum + current, 0);

    this.totalUnits = this.deliverySchedule
      .map((item: any) => parseFloat(item.noOfUnits))
      .reduce((sum: number, current: number) => sum + current, 0);
  }
}
