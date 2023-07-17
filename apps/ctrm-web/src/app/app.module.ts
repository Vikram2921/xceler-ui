import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {XcelerUiModule} from "@xceler-ui/xceler-ui";
import {DeliveryScheduleComponent} from "./physicals/physical_trade/delivery-schedule/delivery-schedule.component";

@NgModule({
  declarations: [AppComponent,DeliveryScheduleComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
        XcelerUiModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
