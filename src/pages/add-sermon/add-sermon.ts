import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-sermon',
  templateUrl: 'add-sermon.html',
})
export class AddSermonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSermonPage');
  }

  closeModal(): void {
    this.toast.create({
      message: 'New record cancelled',
      duration: 1000
    }).present();

    this.navCtrl.pop();
  }

  saveSermon(): void {

    //TODO: Add save sermon code here
    this.toast.create({
      message: 'Sermon Saved',
      duration: 2000
    }).present();

    this.navCtrl.pop();
  }

}
