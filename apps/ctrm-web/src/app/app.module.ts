import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {XcelerUiModule} from "@xceler-ui/xceler-ui";

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
        XcelerUiModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
