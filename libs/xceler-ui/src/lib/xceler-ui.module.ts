import { NgModule } from '@angular/core';
import {
  faAdd,
  faBackward,
  faBackwardFast,
  faCopy,
  faExpandAlt,
  faFileExport,
  faFilter,
  faFileImport,
  faForward,
  faForwardFast,
  faMinimize,
  faPencilAlt,
  faRedo,
  faSave,
  faThumbtack,
  faTimes,
  faTrash,
  faCheck,
  faCross,
  faArrowRight,
  faArrowCircleRight,
  faArrowCircleLeft,
  faCalendar,
  faCircle,
  faCheckCircle,
  faSpinner,
  faInfoCircle, faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { AioControlsComponent } from './components/form-controls/aio-controls/aio-controls.component';
import { PopupComponent } from './components/popup/popup.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { IconButtonComponent } from './components/buttons/icon-button/icon-button.component';
import { OptionButtonComponent } from './components/form-controls/option-button/option-button.component';
import { JSONToUIComponent } from './components/json-to-ui/json-to-ui.component';
import { DropdownComponent } from './components/form-controls/dropdown/dropdown.component';
import { InsideViewportDirective } from './directives/inside-viewport.directive';
import { TextFieldComponent } from './components/form-controls/text-field/text-field.component';
import { ProgressButtonComponent } from './components/buttons/progress-button/progress-button.component';
import { SanitizeHtmlPipe } from './components/toaster/pipe/sanitize-html.pipe';
import { ToastSchedulerDirective } from './components/toaster/directive/toast-scheduler.directive';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { CheckboxComponent } from './components/form-controls/checkbox/checkbox.component';
import { GridToolbarComponent } from './components/grid/grid-toolbar/grid-toolbar.component';
import { PaginatorComponent } from './components/grid/paginator/paginator.component';
import { UnitInputComponent } from './components/form-controls/unit-input/unit-input.component';
import { ToggleButtonComponent } from './components/form-controls/toggle-button/toggle-button.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ScreenInfoComponent } from './components/screen-info/screen-info.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadComponentDirective } from './directives/load-component.directive';
import { ContextPopupComponent } from './components/context-popup/context-popup.component';
import { DatePickerComponent } from './components/form-controls/date-picker/date-picker.component';
import { TextAreaComponent } from './components/form-controls/text-area/text-area.component';
import { DualSliderComponent } from './components/form-controls/dual-slider/dual-slider.component';
import { SliderComponent } from './components/form-controls/slider/slider.component';
import { AdvanceFilterComponent } from './components/advance-filter/advance-filter.component';
import { ValidationBoxComponent } from './components/form-input-component/validation-box/validation-box.component';
import { FormInputComponentComponent } from './components/form-input-component/form-input-component.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordInfoComponent } from './components/RecordInfo/record-info.component';
import { AppendToDirective } from './directives/append-to.directive';
import { TransactionTypePipe } from './pipes/transactiontype.pipe';
import {TabLayoutComponent} from "./components/TabLayout/tab-layout.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Interceptor} from "./interceptor/interceptor.interceptor";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    AdvanceFilterComponent,
    GridComponent,
    AioControlsComponent,
    PopupComponent,
    ToasterComponent,
    IconButtonComponent,
    OptionButtonComponent,
    JSONToUIComponent,
    DropdownComponent,
    InsideViewportDirective,
    TextFieldComponent,
    ProgressButtonComponent,
    SanitizeHtmlPipe,
    ToastSchedulerDirective,
    FilterListPipe,
    CheckboxComponent,
    GridToolbarComponent,
    PaginatorComponent,
    UnitInputComponent,
    ToggleButtonComponent,
    SideMenuComponent,
    ScreenInfoComponent,
    NavbarComponent,
    LoadComponentDirective,
    ContextPopupComponent,
    FormInputComponentComponent,
    ValidationBoxComponent,
    DatePickerComponent,
    TextAreaComponent,
    DualSliderComponent,
    SliderComponent,
    RecordInfoComponent,
    TabLayoutComponent,
  ],
  declarations: [
    GridComponent,
    AioControlsComponent,
    PopupComponent,
    ToasterComponent,
    IconButtonComponent,
    OptionButtonComponent,
    JSONToUIComponent,
    DropdownComponent,
    InsideViewportDirective,
    TextFieldComponent,
    ProgressButtonComponent,
    SanitizeHtmlPipe,
    ToastSchedulerDirective,
    FilterListPipe,
    CheckboxComponent,
    GridToolbarComponent,
    PaginatorComponent,
    UnitInputComponent,
    ToggleButtonComponent,
    SideMenuComponent,
    ScreenInfoComponent,
    NavbarComponent,
    LoadComponentDirective,
    ContextPopupComponent,
    FormInputComponentComponent,
    ValidationBoxComponent,
    DatePickerComponent,
    TextAreaComponent,
    DualSliderComponent,
    SliderComponent,
    AdvanceFilterComponent,
    RecordInfoComponent,
    AppendToDirective,
    TransactionTypePipe,
    TabLayoutComponent,
  ],
  providers:[{provide: HTTP_INTERCEPTORS,useClass:Interceptor,multi:true}]
})
export class XcelerUiModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPencilAlt,
      faCopy,
      faTrash,
      faRedo,
      faAdd,
      faFileImport,
      faFileExport,
      faSpinner,
      faSave,
      faTimes,
      faCheck,
      faCross,
      faArrowRight,
      faArrowCircleRight,
      faArrowCircleLeft,
      faCalendar,
      faCircle,
      faCheckCircle,
      faFilter,
      faExpandAlt,
      faThumbtack,
      faMinimize,
      faForward,
      faForwardFast,
      faBackward,
      faBackwardFast,
      faInfoCircle,
      faChevronLeft
    );
  }
}
