import { AngularFireAuth } from "angularfire2/auth";
import { SermonsProvider } from "./../../providers/sermons/sermons.provider";
import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";

import { Sermons, SermonSeries } from "../../models/sermon.interface";
import { Observable } from "rxjs";

import { Subject } from "rxjs";
import "rxjs/add/operator/takeUntil";

export var display: string = "bySeries";

@IonicPage()
@Component({
  selector: "page-sermons",
  templateUrl: "sermons.html"
})
export class SermonsPage {
  public sermonSeriesList: Array<SermonSeries> = [];
  public sermonTitleList: any = [];

  public sermonList: Observable<Sermons[]>;
  private ngUnsubscribe: Subject<void> = new Subject();
  display: string = "bySeries";

  queryText: string = "";
  items: any;
  userId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sermonData: SermonsProvider,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private sermonProvider: SermonsProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SermonsPage");

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

    this.sermonSeriesList = this.sermonData.loadSermons();
    console.log("Sermons from Provider: ", this.sermonSeriesList);

    this.getSermon();

    try {
      this.sermonList = this.sermonProvider
        .getSermonList(this.userId)
        .valueChanges();

      this.sermonList
        .takeUntil(this.ngUnsubscribe)
        .subscribe(data => console.log("sermonList is: ", data));
      // console.log("sermonList: ", this.sermonList);
    } catch (error) {
      console.log("There was an error loading the sermonList: ", error.message);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addNewSermon(): void {
    console.log("Opening new sermon modal");
    let newSermonModal = this.modalCtrl.create("AddSermonPage");
    newSermonModal.present();
  }

  openSermonDetails(sermon: Sermons): void {
    console.log("Sermon Clicked: ", sermon);
    this.navCtrl.push("SermonDetailsPage", {
      sermon: sermon
    });
  }

  findSermon() {
    if (this.display === "bySeries") {
      this.sermonSeriesList = this.sermonData.findSermonSeries(this.queryText);
    }
    if (this.display === "byTitle") {
      this.sermonTitleList = this.sermonData.findSermonTitle(this.queryText);
    }
  }

  onSearchCancel(): void {
    // this.getSermon();
  }

  getSermon() {
    this.sermonTitleList = [];
    this.sermonSeriesList.forEach(data => {
      let result = data.sermon.map(item => {
        return this.sermonTitleList.push(item);
        // return item;
      });
      console.log("titles", this.sermonTitleList);
    });
  }

  updateDisplay(): void {
    if (this.display === "bySeries") {
      this.display = "byTitle";
    } else {
      this.display = "bySeries";
    }
    console.log("Display: ", this.display);
  }
}
