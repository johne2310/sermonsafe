import { AngularFireAuth } from "angularfire2/auth";
import { AuthProvider } from "./auth/auth.provider";
import { Injectable } from "@angular/core";

import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = "hasLoggedIn";
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";
  rootPage: any;

  constructor(
    public events: Events,
    public storage: Storage,
    private afAuth: AngularFireAuth
  ) {}

  hasFavorite(sessionName: string): boolean {
    return this._favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish("user:login");
  }

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish("user:signup");
  }

  logout(): Promise<void> {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove("username");
    this.events.publish("user:logout");
    console.log("About to logout");
    return this.afAuth.auth.signOut();
  }

  setUsername(username: string): void {
    this.storage.set("username", username);
  }

  getUsername(): Promise<string> {
    return this.storage.get("username").then(value => {
      return value;
    });
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then(value => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then(value => {
      return value;
    });
  }
}
