import {EventListener} from "../interfaces/event-listener";
import {BaseComponent} from "../components/form-controls/core/base-component";

export class HostActivity extends BaseComponent{

  private _popupStateListener!:EventListener;
  private _id!:string;


  get popupStateListener(): EventListener {
    return this._popupStateListener;
  }

  set popupStateListener(value: EventListener) {
    this._popupStateListener = value;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  closePopup() {
    this.popupStateListener.onPopupClosed(this.id);
  }

  init(props: {[key:string]:any}) {}

  reset() {}
}
