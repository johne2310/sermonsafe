import { SermonsPage } from "./../pages/sermons/sermons";
import { TabsPage } from "./../pages/tabs/tabs-page";
import { AngularFireAuth } from "angularfire2/auth";
import { Component, ViewChild } from "@angular/core";

import { Events, MenuController, Nav, Platform, Tabs } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";

import { Storage } from "@ionic/storage";

import { UserData } from "../providers/user-data";
import { APP_PAGES } from "../menus/appPages";
import { LOGGED_IN_PAGES } from "../menus/loggedInPages";
import { LOGGED_OUT_PAGES } from "../menus/loggedOutPages";
import { PageInterface } from "../models/page.interface";

@Component({
  templateUrl: "app.template.html"
})
export class SermonSafeApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  appPages: PageInterface[] = [];
  loggedInPages: PageInterface[] = [];
  loggedOutPages: PageInterface[] = [];

  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    afAuth: AngularFireAuth
  ) {
    //check auth state and direct page route depending on whether the user is logged in

    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = "TabsPage";

        // decide which menu items should be hidden by current login status stored in local storage

        // this.enableMenu(hasLoggedIn === true);
        this.enableMenu(true);

        this.listenToLoginEvents();
      } else {
        console.log("Changing page to login page");
        this.rootPage = "LoginPage";
      }
    });

    this.appPages = APP_PAGES;
    this.loggedInPages = LOGGED_IN_PAGES;
    this.loggedOutPages = LOGGED_OUT_PAGES;

    this.platformReady();

    // Check if the user has already seen the tutorial
    // this.storage.get("hasSeenTutorial").then(hasSeenTutorial => {
    //   if (hasSeenTutorial) {
    //     this.rootPage = "TabsPage";
    //   } else {
    //     this.rootPage = "TutorialPage";
    //   }

    // });
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.name, params).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot("TutorialPage");
  }

  listenToLoginEvents() {
    this.events.subscribe("user:login", () => {
      this.enableMenu(true);
    });

    this.events.subscribe("user:signup", () => {
      this.enableMenu(true);
    });

    this.events.subscribe("user:logout", () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, "loggedInMenu");
    this.menu.enable(!loggedIn, "loggedOutMenu");
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().root === page.tabName
      ) {
        return "primary";
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return "primary";
    }
    return;
  }
}
