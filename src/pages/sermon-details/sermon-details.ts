import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(private navCtrl: NavController, private navParams: NavParams) {

    this.sermon = this.navParams.get('sermon');
    console.log('Sermon: ', this.sermon);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SermonDetailsPage');



  }

}
