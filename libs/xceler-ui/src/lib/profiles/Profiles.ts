import {
  Activity, ApiService, ButtonModel,
  ColumnModel, ComponentRegister, FormInputComponentComponent,
  FunctionParams,
  GridComponent, GridToolbarComponent, ListOption, OptionButtonComponent, PopupProps, PopupService, Resolver,
  ScreenInfoComponent,
  ScreenRegister, ToastService
} from "@xceler-ui/xceler-ui";

export const ProfileFunctions:{[key:string]:Function} = {

  simple_grid : async (options:FunctionParams | any) => {
    let activity:Activity = ScreenRegister.getScreen(options.options.screen);
    let update:boolean = options.update;
    let idField:ColumnModel | undefined = activity.screenJson.getColumns().find(column => column.idField);
    let gridObj!:GridComponent;
    let screenInfoFunction:Function = (screenInfo:ScreenInfoComponent) => {
      screenInfo.iconPath = activity.screenJson.iconPath;
      screenInfo.title = activity.screenJson.title;
      screenInfo.advanceFilter = true;
    }

    let addEdit = (next:any) => {
      if(next.buttonName == 'Add' || next.buttonName == 'Edit') {
        PopupService.removePopup(next.buttonName);
        let headerProps:any = {
          show:true,
          title:'New '+activity.screenJson.title,
        }
        if(next.buttonName == 'Edit') {
          if(activity.selectedRows.length == 0){
              ToastService.addErrorMessage('Warning','Please select a row to edit');
              return;
          }
          if(idField) {
            headerProps.title = activity.selectedRows[0][idField.field];
          }
          options['rowData'] = activity.selectedRows[0];
        } else {
          options['rowData'] = null;
        }
        PopupService.addPopup(next.buttonName,FormInputComponentComponent,options,headerProps,undefined,new PopupProps('right',true,true,'75%'));
        activity.selectedRows = [];
      }
    }

    let refresh = (next:any) => {
      if(gridObj) {
        refreshButton.disable();
        refreshButton.setAnimation('spin');
        ApiService.get(Resolver.getModifiedUrl(activity.screenJson.urls.fetchUrl,options.options.environment,undefined,gridObj.currentPage)).then((next:any) => {
          activity.data =next;
          gridObj.refreshData();
          refreshButton.enable();
          refreshButton.clearAnimation();
        });
      }
    }

    let leftButton:ButtonModel[] =[];
    let addButton:ButtonModel = new ButtonModel('Add',false,['fas','add'],addEdit);
    let editButton:ButtonModel = new ButtonModel('Edit',false,['fas','pencil-alt'],addEdit);
    let duplicateButton:ButtonModel = new ButtonModel('Duplicate',false,['fas','copy'],addEdit);
    let deleteButton:ButtonModel = new ButtonModel('Delete',false,['fas','trash'],addEdit);
    let refreshButton:ButtonModel = new ButtonModel('Refresh',false,['fas','redo'],refresh);
    leftButton.push(addButton)
    leftButton.push(editButton)
    leftButton.push(duplicateButton)
    leftButton.push(deleteButton)
    leftButton.push(refreshButton)

    let gridFunction:Function = async (grid:GridComponent) => {
      gridObj = grid;
      grid.show(activity);
      refreshButton.disable();
      refreshButton.setAnimation('spin');
      activity.data = await ApiService.get(Resolver.getModifiedUrl(activity.screenJson.urls.fetchUrl,options.options.environment,undefined,0)).then((next:any) => next);
      grid.refreshData();
      refreshButton.enable();
      refreshButton.clearAnimation();
      grid.onPageChange.subscribe( (pageNumber)=> {
          activity.data = [];
          grid.refreshData();
          refreshButton.disable();
        refreshButton.setAnimation('spin');
          ApiService.get(Resolver.getModifiedUrl(activity.screenJson.urls.fetchUrl,options.options.environment,undefined,pageNumber)).then((next:any) => {
            activity.data =next;
            grid.refreshData();
            refreshButton.enable();
            refreshButton.clearAnimation();
          });
      })
    }

    let gridToolbarFunction:Function = (gridToolbar:GridToolbarComponent) => {
      gridToolbar.setLeftButton(leftButton);
    }
    let tabsFunction:Function = (opButton:OptionButtonComponent) => {
      opButton.options =  activity.screenJson.tabs.map(tab => new ListOption(tab.label,tab.label));
      opButton.value = activity.screenJson.tabs.find(tab => tab.selected)?.label;
      if(opButton.value === null || opButton.value === undefined) {
          opButton.value = activity.screenJson.tabs[0].label;
      }
    }
    if(update) {
      let screenInfo:ScreenInfoComponent = ComponentRegister.getElement("navbar").activity;
      let grid:GridComponent = ComponentRegister.getElement("grid").activity;
      let toolbar:GridToolbarComponent = ComponentRegister.getElement("grid_toolbar").activity;
      let tabs:OptionButtonComponent = ComponentRegister.getElement("tabs").activity;
      screenInfoFunction(screenInfo);
      gridFunction(grid);
      gridToolbarFunction(toolbar);
      if(activity.screenJson.tabs) {
          tabsFunction(tabs);
      } else {
        tabs.hide();
      }
    } else {
      ComponentRegister.getElementMap().subscribe((next:any) => {
        switch (next['name']) {
          case 'tabs':
            tabsFunction(next.element);
            break;
          case 'grid':
            gridFunction(next.element)
            break;
          case 'grid_toolbar':
            gridToolbarFunction(next.element);
            break;
          case 'navbar':
            screenInfoFunction(next.element);
            break;
        }

      })
    }
  }
}
