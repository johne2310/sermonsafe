import { SermonsProvider } from "./../../providers/sermons/sermons.provider";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ModalController,
  FabContainer
} from "ionic-angular";
import { Sermons } from "../../models/sermon.interface";

/**
 * Generated class for the SermonDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sermon-details",
  templateUrl: "sermon-details.html"
})
export class SermonDetailsPage {
  public sermon: Sermons;
  public locationList: any = [];
  public sermonId: string;
  public locationId: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toast: ToastController,
    private modalCtrl: ModalController,
    private sermonProvider: SermonsProvider
  ) {
    this.sermon = this.navParams.get("sermon");
    console.log("Sermon: ", this.sermon);

    this.sermonId = this.sermon.sermonId;
    this.locationId = this.sermon.locationId;

    for (var key in this.sermon.location) {
      console.log(key + "-->" + this.sermon.location[key]);
      this.locationList.push(key);
    }
    // this.locationList = this.sermon.location.keys;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SermonDetailsPage");
  }

  deleteSermon(fab: FabContainer): void {
    fab.close();
    console.log("Delete sermon clicked");
    this.toast
      .create({
        message: "Sermon deleted",
        duration: 2000
      })
      .present();
  }

  addSermonToSeries(fab: FabContainer): void {
    console.log("Add sermon clicked");

    fab.close();

    let newSermonModal = this.modalCtrl.create("AddSermonPage");
    newSermonModal.present();
  }

  editSermon(fab: FabContainer): void {
    console.log("Edit sermon clicked");

    fab.close();

    const newLocation = "Beecroft";
    let date = new Date();

    console.log("sermonId ", this.sermonId);
    console.log("location ", newLocation);
    console.log("Date: ", date);

    this.sermonProvider.updateSermon(this.sermonId, newLocation, date);

    this.toast
      .create({
        message: "Sermon Edited",
        duration: 2000
      })
      .present();
  }
}
