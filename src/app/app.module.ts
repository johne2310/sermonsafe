import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ConferenceData } from '../providers/conference-data';
import { SermonsProvider } from '../providers/sermons/sermons.data';
import { UserData } from '../providers/user-data';
import { SermonSafeApp } from './app.component';

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
