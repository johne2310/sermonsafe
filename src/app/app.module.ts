import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { SermonSafeApp } from './app.component';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { SermonsProvider } from '../providers/sermons/sermons';

@NgModule({
  declarations: [
    SermonSafeApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SermonSafeApp, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SermonSafeApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    SermonsProvider
  ]
})
export class AppModule { }
