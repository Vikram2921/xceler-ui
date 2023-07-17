import {Component} from '@angular/core';
import {BaseComponent} from "../form-controls/core/base-component";
import {PopupService} from "./service/popup-service.service";
import {Resolver} from "../../models/resolver";

@Component({
  selector: 'xui-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent extends BaseComponent {
  protected readonly PopupService = PopupService;
  protected readonly Resolver = Resolver;
}
