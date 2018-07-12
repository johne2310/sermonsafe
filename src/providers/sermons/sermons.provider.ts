import { userProfile } from "./../../models/user.interface";
import { Sermons } from "./../../models/sermon.interface";
import "rxjs/add/operator/map";

import { Injectable } from "@angular/core";

import { SERMON_LIST } from "../../mocks/sermons.mocks";
import { SermonSeries } from "../../models/sermon.interface";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import {
  LoadingController,
  Loading
} from "../../../node_modules/ionic-angular";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "../../../node_modules/angularfire2/firestore";

@Injectable()
export class SermonsProvider {
  public sermonSeriesList: Array<SermonSeries> = [];
  public sermonTitleList: Array<any> = [];

  userId: string;
  public locationId: string;
  public sermonId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private firesStore: AngularFirestore
  ) {
    console.log("Hello SermonsProvider Provider");
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; //get user id from firebase user
      }
    });
  }

  loadSermons() {
    return (this.sermonSeriesList = SERMON_LIST);
    // return this.getSermonList(this.userId);
  }

  loadSermon() {
    this.sermonTitleList = [];
    this.sermonSeriesList.forEach(data => {
      let result = data.sermon.map(item => {
        return this.sermonTitleList.push(item);
        // return item;
      });
      console.log("titles", this.sermonTitleList);
    });
  }

  findSermonSeries(queryText) {
    //trim search value to ensure result is returned if additional spaces are typed
    let val = queryText.trim();

    // search by series
    if (val !== "") {
      return this.sermonSeriesList.filter(item => {
        return item.series.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      return this.sermonSeriesList;
    }
  }

  findSermonTitle(searchTerm) {
    //trim search value to ensure result is returned if additional spaces are typed
    this.loadSermon();
    let val = searchTerm.trim();
    if (val !== "") {
      return this.sermonTitleList.filter(item => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      return this.sermonTitleList; // = [];
      // return this.loadSermon();
    }
  }

  addNewSermon(title: string, series: string): Promise<void> {
    this.sermonId = this.firesStore.createId();
    this.locationId = this.firesStore.createId();

    console.log("SermonId: ", this.sermonId);

    return this.firesStore
      .doc<Sermons>(`/userProfile/${this.userId}/sermonList/${this.sermonId}`)
      .set({
        sermonId: this.sermonId,
        title: title,
        series: series,
        locationId: this.locationId
      });
  }

  addNewLocation(location: string): Promise<void> {
    return this.firesStore
      .doc<any>(`/userProfile/${this.userId}/locationList/${this.locationId}`)
      .set({
        sermonId: this.sermonId,
        locationId: this.locationId,
        locationName: location,
        date: new Date()
      });

    console.log("Second return complete");
  }

  getSermonList(userId: string): AngularFirestoreCollection<Sermons> {
    return this.firesStore.collection<Sermons>(
      `/userProfile/${this.userId}/sermonList`,
      ref => ref.orderBy("title")
    );
  }

  updateSermonX(sermonId: string, location: string): Promise<void> {
    const locationRef = this.firesStore.doc(
      `/userProfile/${this.userId}/sermonList/${sermonId}`
    ).ref;

    return this.firesStore
      .doc<any>(`/userProfile/${this.userId}/sermonList/${sermonId}`)
      .set(
        {
          location: {
            [location]: true
          }
        },
        { merge: true }
      );
  }

  updateSermon(location: string, date: Date): Promise<void> {
    const newLocationId = this.firesStore.createId();
    const locationRef = this.firesStore.doc(
      `/userProfile/${this.userId}/locationList/${newLocationId}`
    ).ref;

    return locationRef.set({
      sermonId: this.sermonId,
      locationId: newLocationId,
      locationName: location,
      date: date
    });

    // return this.firesStore
    //   .doc<any>(`/userProfile/${this.userId}/locationList/${newLocationId}`)
    //   .set({
    //     sermonId: sermonId,
    //     locationId: newLocationId,
    //     locationName: location,
    //     date: date
    //   });
  }
}
