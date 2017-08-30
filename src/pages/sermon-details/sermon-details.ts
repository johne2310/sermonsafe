import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Sermons } from '../../models/sermon.interface';

/**
 * Generated class for the SermonDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sermon-details',
  templateUrl: 'sermon-details.html',
})
export class SermonDetailsPage {

  public sermon: Sermons;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toast: ToastController) {

    this.sermon = this.navParams.get('sermon');
    console.log('Sermon: ', this.sermon);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SermonDetailsPage');

  }

  deleteSermon(): void {
    console.log('Delete sermon clicked');
    this.toast.create({
      message: 'Sermon deleted',
      duration: 2000
    }).present();
  }

  addSermonToSeries(): void {
    console.log('Add sermon clicked');
    this.toast.create({
      message: 'Sermon Added',
      duration: 2000
    }).present();
  }


  editSermon(): void {
    console.log('Edit sermon clicked');
    this.toast.create({
      message: 'Sermon Edited',
      duration: 2000
    }).present();
  }

}
