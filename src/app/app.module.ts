import { ErrorHandler, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SermonsProvider } from "../providers/sermons/sermons.provider";
import { UserData } from "../providers/user-data";
import { SermonSafeApp } from "./app.component";

import { firebaseConfig } from "./credentials";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AuthProvider } from "../providers/auth/auth.provider";

@NgModule({
  declarations: [SermonSafeApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SermonSafeApp, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [SermonSafeApp],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserData,
    SplashScreen,
    SermonsProvider,
    InAppBrowser,
    AuthProvider
  ]
})
export class AppModule {}
