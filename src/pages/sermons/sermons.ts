import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { SermonSeries, Sermons } from '../../models/sermon.interface';
import { SermonsProvider } from '../../providers/sermons/sermons';


@IonicPage()
@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html',
})
export class SermonsPage {

  public sermonList: Array<SermonSeries> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sermons: SermonsProvider, private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SermonsPage');

    this.sermonList = this.sermons.loadSermons();
    console.log('Sermons from Provider: ', this.sermonList);
  }

  addNewSermon(): void {

    console.log('Opening new sermon modal');
    let newSermonModal = this.modalCtrl.create('AddSermonPage');
    newSermonModal.present();
  }

  openSermonDetails(sermon: Sermons): void {
    console.log('Sermon Clicked: ', sermon);
    this.navCtrl.push('SermonDetailsPage', {
      sermon: sermon
    });
  }

}

