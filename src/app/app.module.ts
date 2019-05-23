/* Service Provioder */
import { HttpService } from './core/http.service';
import { Utils } from './helpers/utils';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(
      {
        name: 'survivalDB',
        driverOrder: ['sqlite', 'websql', 'indexeddb']
      }
    ),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    BackgroundMode,
    Utils,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
