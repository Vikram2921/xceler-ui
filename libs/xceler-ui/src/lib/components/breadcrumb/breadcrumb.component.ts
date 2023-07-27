import {Component, Input} from '@angular/core';

@Component({
  selector: 'xui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  @Input() list:any[] =['Physical Trade'];

}
