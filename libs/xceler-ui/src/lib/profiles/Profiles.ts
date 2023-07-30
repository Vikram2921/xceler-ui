import {
  Activity,
  ApiService,
  ButtonModel,
  ColumnModel,
  ComponentRegister,
  FormControlService,
  FormInputComponentComponent,
  FunctionParams,
  FunctionRegister,
  GridComponent,
  GridToolbarComponent,
  JsonToUIService,
  ListOption,
  OptionButtonComponent,
  PopupProps,
  PopupService,
  Profiles,
  ProgressButtonProp,
  RecordInfoComponent,
  ScreenInfoComponent,
  ScreenRegister,
  ToastService,
  TabLayoutComponent
} from "@xceler-ui/xceler-ui";
import {Subscription} from "rxjs";

export const ProfileFunctions: { [key: string]: Function } = {

  simple_grid: async (options: FunctionParams | any) => {
    let componentId = options.componentId;
    options['formControlService'] = new FormControlService();
    let activity: Activity = ScreenRegister.getScreen(options.screen);
    let subscription:Subscription;
    let lastState = JsonToUIService.getState(activity.screenJson.title);
    let update: boolean = options.update;
    let idField: ColumnModel | undefined = activity.screenJson.getColumns().find(column => column.idField);
    let gridObj!: GridComponent;
    let screenInfoFunction: Function = (screenInfo: ScreenInfoComponent) => {
      screenInfo.iconPath = activity.screenJson.iconPath;
      screenInfo.title = activity.screenJson.title;
      screenInfo.advanceFilter = true;
    }

    let addEdit = (next: any) => {
      if (next.buttonName == 'Add' || next.buttonName == 'Edit') {
        PopupService.removePopup(next.buttonName);
        let headerProps: any = {
          show: true,
          title: 'New ' + activity.screenJson.title,
        }
        let buttons: ProgressButtonProp[] = [];
        let info: any = null;
        if (next.buttonName == 'Edit') {
          if (activity.selectedRows.length == 0) {
            ToastService.addErrorMessage('Warning', 'Please select a row to edit');
            return;
          }
          let updateButton = new ProgressButtonProp('Update', false, false, (buttonProp: ProgressButtonProp) => {
            buttonProp.text = "Updating";
            buttonProp.disabled = true;
            let hasPreSave = FunctionRegister.hasFunction(activity.screenJson.functionFile, "preSave");
            let payload = {};
            if (hasPreSave) {
              let func = FunctionRegister.getFunction(activity.screenJson.functionFile, "preSave");
              if (func) {
                payload = func(options, 'update');
              }
            }
            // ApiService.decideUrlCallItself(activity.screenJson.urls.updateUrl,options.environment,payload).then((next:any) => {
            //   PopupService.removePopup(next.buttonName);
            //   ToastService.addSuccessMessage('Success','Data updated successfully !');
            // });
          })
          buttons.push(updateButton);
          if (idField) {
            headerProps.title = activity.selectedRows[0][idField.field];
          }
          info = {};
          info['createdBy'] = activity.selectedRows[0]['createdBy'];
          info['createdTimestamp'] = activity.selectedRows[0]['createdTimestamp'];
          info['updatedBy'] = activity.selectedRows[0]['updatedBy'];
          info['updatedTimestamp'] = activity.selectedRows[0]['updatedTimestamp'];
          options['rowData'] = activity.selectedRows[0];
        } else {
          let saveButton = new ProgressButtonProp('Save', false, false, (buttonProp: ProgressButtonProp) => {
            buttonProp.text = "Saving";
            buttonProp.disabled = true;
            let hasPreSave = FunctionRegister.hasFunction(activity.screenJson.functionFile, "preSave");
            let payload = {};
            if (hasPreSave) {
              let func = FunctionRegister.getFunction(activity.screenJson.functionFile, "preSave");
              if (func) {
                payload = func(options, 'save');
              }
            }
            // ApiService.decideUrlCallItself(activity.screenJson.urls.saveUrl,options.environment,payload).then((next:any) => {
            //   PopupService.removePopup(next.buttonName);
            //   ToastService.addSuccessMessage('Success','Data saved successfully !');
            // });
          })
          buttons.push(saveButton);
          options['rowData'] = null;
        }
        let footerProps: any = {
          show: true,
          progressButtons: buttons,
          info: info
        }
        PopupService.addPopup(next.buttonName, FormInputComponentComponent, options, headerProps, footerProps, new PopupProps('right', true, true, '75%'));
        activity.selectedRows = [];
      }
    }

    let refresh = (next: any) => {
      if (gridObj) {
        refreshButton.disable();
        refreshButton.setAnimation('spin');
        ApiService.decideUrlCallItself(activity.screenJson.urls.fetchUrl, options.environment, {page: gridObj.currentPage}).then((next: any) => {
          activity.data = next;
          gridObj.refreshData();
          refreshButton.enable();
          refreshButton.clearAnimation();
        });
      }
    }

    let leftButton: ButtonModel[] = [];
    let addButton: ButtonModel = new ButtonModel('Add', false, ['fas', 'add'], addEdit);
    let editButton: ButtonModel = new ButtonModel('Edit', false, ['fas', 'pencil-alt'], addEdit);
    let duplicateButton: ButtonModel = new ButtonModel('Duplicate', false, ['fas', 'copy'], addEdit);
    let deleteButton: ButtonModel = new ButtonModel('Delete', false, ['fas', 'trash'], addEdit);
    let refreshButton: ButtonModel = new ButtonModel('Refresh', false, ['fas', 'redo'], refresh);
    leftButton.push(addButton)
    leftButton.push(editButton)
    leftButton.push(duplicateButton)
    leftButton.push(deleteButton)
    leftButton.push(refreshButton)

    let gridFunction: Function = async (grid: GridComponent) => {
      gridObj = grid;
      gridObj.onFieldClick.subscribe((next) => {
        if(activity.screenJson.innerTabs && activity.screenJson.innerTabs.length > 0) {
          ComponentRegister.unsubscribeAll();
          JsonToUIService.saveState(activity.screenJson.title,{page:gridObj.currentPage,profile: options.lastProfile,currentOptions:options})
          JsonToUIService.get(componentId).loadProfile(Profiles.TAB_GRID, {
            data: next['row'],
            columns: activity.screenJson.getColumns(),
            tabs: activity.screenJson.innerTabs,
            mainActivity: activity,
            componentId:componentId,
            environment: options.environment,
          });
        }
      })
      grid.show(activity);
      if (!activity.screenJson.tabs || activity.screenJson.tabs.length === 0) {
        refreshButton.disable();
        refreshButton.setAnimation('spin');
        activity.data = await ApiService.decideUrlCallItself(activity.screenJson.urls.fetchUrl, options.environment, {page: 0}).then((next: any) => next);
        grid.refreshData();
        refreshButton.enable();
        refreshButton.clearAnimation();
        grid.onPageChange.subscribe((pageNumber) => {
          activity.data = [];
          grid.refreshData();
          refreshButton.disable();
          refreshButton.setAnimation('spin');
          ApiService.decideUrlCallItself(activity.screenJson.urls.fetchUrl, options.environment, {page: pageNumber}).then((next: any) => {
            activity.data = next;
            grid.refreshData();
            refreshButton.enable();
            refreshButton.clearAnimation();
          });
        })
      }
    }

    let gridToolbarFunction: Function = (gridToolbar: GridToolbarComponent) => {
      gridToolbar.setLeftButton(leftButton);
    }
    let tabsFunction: Function = (opButton: OptionButtonComponent) => {
      opButton.options = activity.screenJson.tabs.map(tab => new ListOption(tab.label, tab.label));
      opButton.value = activity.screenJson.tabs.find(tab => tab.selected)?.label;
      let onTabChange = async (tabLabel: string) => {
        refreshButton.disable();
        refreshButton.setAnimation('spin');
        activity.data = [];
        if (gridObj) {
          gridObj.refreshData();
        }
        let tab = activity.screenJson.tabs.find((tab) => tab.label === tabLabel);
        if (tab) {
          if (tab.useSameModel) {
            let urls = tab.urls;
            if (urls.fetchUrl.payloadFunction && urls.fetchUrl.payloadFunction.length > 0) {
              urls.fetchUrl.data = FunctionRegister.callFunction(activity.screenJson.functionFile, urls.fetchUrl.payloadFunction, {tab: tab});
            }
            activity.data = await ApiService.decideUrlCallItself(urls.fetchUrl, options.environment, {page: 0}).then((next: any) => next);
            gridObj.refreshData();
          }
          refreshButton.enable();
          refreshButton.clearAnimation();
        }
      }
      if (opButton.value === null || opButton.value === undefined) {
        opButton.value = activity.screenJson.tabs[0].label;
      }
      onTabChange(opButton.value);
      opButton.onOptionChange.subscribe(async (next: ListOption) => {
        await onTabChange(next.label);
      })
    }
    if (update) {
      let screenInfo: ScreenInfoComponent = ComponentRegister.getElement("navbar").component;
      let grid: GridComponent = ComponentRegister.getElement("grid").component;
      let toolbar: GridToolbarComponent = ComponentRegister.getElement("grid_toolbar").component;
      let tabs: OptionButtonComponent = ComponentRegister.getElement("tabs").component;
      screenInfoFunction(screenInfo);
      gridFunction(grid);
      gridToolbarFunction(toolbar);
      if (activity.screenJson.tabs) {
        tabsFunction(tabs);
      } else {
        tabs.hide();
      }
    } else {
      subscription = ComponentRegister.getElementMap().subscribe((next: any) => {
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
      ComponentRegister.setCurrentSubscription(subscription);
    }
  },
  tab_grid: async (options: FunctionParams | any) => {
    let update: boolean = options.update;
    let recordInfoFunction: Function = (info: RecordInfoComponent) => {
      info.init(options);
      info.onClickBack.subscribe((next) => {
        ComponentRegister.unsubscribeAll();
      })
    }
    let tabsLayoutFunction: Function = (tabsLayout: TabLayoutComponent) => {
      tabsLayout.init({
        tabs:options.tabs,
        selected: options.tabs.find((item:any) => item.selected)?.label,
        idField: options.mainActivity.idField,
        environment: options.environment,
        parentData: options.data,
      });
    }
    if (update) {
      let recordInfo: RecordInfoComponent = ComponentRegister.getElement("info").component;
      let tabLayout: TabLayoutComponent = ComponentRegister.getElement("tabsLayout").component;
      recordInfoFunction(recordInfo);
      tabsLayoutFunction(tabLayout);
    } else {
      let subscribe = ComponentRegister.getElementMap().subscribe((next: any) => {
        switch (next['name']) {
          case 'info':
            recordInfoFunction(next.element);
            break;
          case 'tabsLayout':
            tabsLayoutFunction(next.element);
            break;
        }
      })
      ComponentRegister.setCurrentSubscription(subscribe);
    }
  },
  grid_only: async (options: FunctionParams | any) => {
    let gridObj: GridComponent;
    let activity: Activity = ScreenRegister.getScreen(options.screen);
    let update = options['update'];
    options['formControlService'] = new FormControlService();
    let parentData = options['parentData'];
    let idField:ColumnModel | undefined = activity.screenJson.getColumns().find(column => column.idField);
    let addEdit = (next: any) => {
      if (next.buttonName == 'Add' || next.buttonName == 'Edit') {
        PopupService.removePopup(next.buttonName);
        let headerProps: any = {
          show: true,
          title: 'New ' + activity.screenJson.title,
        }
        let buttons: ProgressButtonProp[] = [];
        let info: any = null;
        if (next.buttonName == 'Edit') {
          if (activity.selectedRows.length == 0) {
            ToastService.addErrorMessage('Warning', 'Please select a row to edit');
            return;
          }
          let updateButton = new ProgressButtonProp('Update', false, false, (buttonProp: ProgressButtonProp) => {
            buttonProp.text = "Updating";
            buttonProp.disabled = true;
            let hasPreSave = FunctionRegister.hasFunction(activity.screenJson.functionFile, "preSave");
            let payload = {};
            if (hasPreSave) {
              let func = FunctionRegister.getFunction(activity.screenJson.functionFile, "preSave");
              if (func) {
                payload = func(options, 'update');
              }
            }
            // ApiService.decideUrlCallItself(activity.screenJson.urls.updateUrl,options.environment,payload).then((next:any) => {
            //   PopupService.removePopup(next.buttonName);
            //   ToastService.addSuccessMessage('Success','Data updated successfully !');
            // });
          })
          buttons.push(updateButton);
          if (idField) {
            headerProps.title = activity.selectedRows[0][idField.field];
          }
          info = {};
          info['createdBy'] = activity.selectedRows[0]['createdBy'];
          info['createdTimestamp'] = activity.selectedRows[0]['createdTimestamp'];
          info['updatedBy'] = activity.selectedRows[0]['updatedBy'];
          info['updatedTimestamp'] = activity.selectedRows[0]['updatedTimestamp'];
          options['rowData'] = activity.selectedRows[0];
        } else {
          let saveButton = new ProgressButtonProp('Save', false, false, (buttonProp: ProgressButtonProp) => {
            buttonProp.text = "Saving";
            buttonProp.disabled = true;
            let hasPreSave = FunctionRegister.hasFunction(activity.screenJson.functionFile, "preSave");
            let payload = {};
            if (hasPreSave) {
              let func = FunctionRegister.getFunction(activity.screenJson.functionFile, "preSave");
              if (func) {
                payload = func(options, 'save');
              }
            }
            // ApiService.decideUrlCallItself(activity.screenJson.urls.saveUrl,options.environment,payload).then((next:any) => {
            //   PopupService.removePopup(next.buttonName);
            //   ToastService.addSuccessMessage('Success','Data saved successfully !');
            // });
          })
          buttons.push(saveButton);
          options['rowData'] = null;
        }
        let footerProps: any = {
          show: true,
          progressButtons: buttons,
          info: info
        }
        PopupService.addPopup(next.buttonName, FormInputComponentComponent, options, headerProps, footerProps, new PopupProps('right', true, true, '75%'));
        activity.selectedRows = [];
      }
    }

    let refresh = (next: any) => {
      if (gridObj) {
        refreshButton.disable();
        refreshButton.setAnimation('spin');
        ApiService.decideUrlCallItself(activity.screenJson.urls.fetchUrl, options.environment, Object.assign(parentData,{page: gridObj.currentPage})).then((next: any) => {
          activity.data = next;
          gridObj.refreshData();
          refreshButton.enable();
          refreshButton.clearAnimation();
        });
      }
    }

    let leftButton: ButtonModel[] = [];
    let addButton: ButtonModel = new ButtonModel('Add', false, ['fas', 'add'], addEdit);
    let editButton: ButtonModel = new ButtonModel('Edit', false, ['fas', 'pencil-alt'], addEdit);
    let duplicateButton: ButtonModel = new ButtonModel('Duplicate', false, ['fas', 'copy'], addEdit);
    let deleteButton: ButtonModel = new ButtonModel('Delete', false, ['fas', 'trash'], addEdit);
    let refreshButton: ButtonModel = new ButtonModel('Refresh', false, ['fas', 'redo'], refresh);
    leftButton.push(addButton)
    leftButton.push(editButton)
    leftButton.push(duplicateButton)
    leftButton.push(deleteButton)
    leftButton.push(refreshButton)
    let gridFunction: Function = async (grid: GridComponent) => {
      gridObj = grid;
      // gridObj.onFieldClick.subscribe((next) => {
      //
      // })
      grid.show(activity);
      if (!activity.screenJson.tabs || activity.screenJson.tabs.length === 0) {
        refreshButton.disable();
        refreshButton.setAnimation('spin');
        activity.data = await ApiService.decideUrlCallItself(activity.screenJson.urls.fetchUrl, options.environment, Object.assign(parentData,{page: 0})).then((next: any) => next);
        grid.refreshData();
        refreshButton.enable();
        refreshButton.clearAnimation();
        grid.onPageChange.subscribe((pageNumber) => {
          activity.data = [];
          grid.refreshData();
          refreshButton.disable();
          refreshButton.setAnimation('spin');
          ApiService.decideUrlCallItself(activity.screenJson.urls.fetchUrl, options.environment, Object.assign(parentData,{page: pageNumber})).then((next: any) => {
            activity.data = next;
            grid.refreshData();
            refreshButton.enable();
            refreshButton.clearAnimation();
          });
        })
      }
    }
    let gridToolbarFunction: Function = (gridToolbar: GridToolbarComponent) => {
      gridToolbar.setLeftButton(leftButton);
    }
    if (update) {
      let toolbarComponent: GridToolbarComponent = ComponentRegister.getElement("grid_toolbar").component;
      let gridComponent: GridComponent = ComponentRegister.getElement("grid").component;
      gridToolbarFunction(toolbarComponent);
      gridFunction(gridComponent);
    } else {
      let subscribe = ComponentRegister.getElementMap().subscribe((next: any) => {
        switch (next['name']) {
          case 'grid_toolbar':
            gridToolbarFunction(next.element);
            break;
          case 'grid':
            gridFunction(next.element);
            break;
        }
      })
      ComponentRegister.setCurrentSubscription(subscribe);
    }
  }
}
