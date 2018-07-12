import { SermonsProvider } from "./../../providers/sermons/sermons.provider";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  Loading,
  Alert,
  AlertController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-add-sermon",
  templateUrl: "add-sermon.html"
})
export class AddSermonPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private sermonProvider: SermonsProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddSermonPage");
  }

  closeModal(): void {
    this.toast
      .create({
        message: "New record cancelled",
        duration: 1000
      })
      .present();

    this.navCtrl.pop();
  }

  async saveSermon(): Promise<any> {
    //TODO: Add save sermon code here

    let loading: Loading = this.loadingCtrl.create();
    loading.present();

    const title = "Sermon Title 6";
    const series = "Sermon Series 7";
    const location = "Ringwood";

    try {
      await this.sermonProvider.addNewSermon(title, series);
      await this.sermonProvider.addNewLocation(location);
      await loading.dismiss();
      this.toast
        .create({
          message: "Sermon Saved",
          duration: 2000
        })
        .present();
      this.navCtrl.pop();
    } catch (error) {
      await loading.dismiss();
      const alert: Alert = this.alertCtrl.create({
        message: error.message,
        buttons: [
          {
            text: "Ok",
            role: "cancel"
          }
        ]
      });
      alert.present();
    }
  }
}
