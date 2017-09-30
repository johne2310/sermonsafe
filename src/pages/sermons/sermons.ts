import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Sermons, SermonSeries } from '../../models/sermon.interface';
import { SermonsProvider } from '../../providers/sermons/sermons.data';

export var display: string = 'bySeries';

@IonicPage()
@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html',
})
export class SermonsPage {

  public sermonSeriesList: Array<SermonSeries> = [];
  public sermonTitleList: any = [];
  display: string = 'bySeries'

  queryText: string = '';
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sermonData: SermonsProvider, private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SermonsPage');

    this.sermonSeriesList = this.sermonData.loadSermons();
    console.log('Sermons from Provider: ', this.sermonSeriesList);

    this.getSermon();
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

  findSermon() {
    if (this.display === 'bySeries') {
      this.sermonSeriesList = this.sermonData.findSermonSeries(this.queryText);
    }
    if (this.display === 'byTitle') {
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
      console.log('titles', this.sermonTitleList);
    });
  }

  updateDisplay(): void {
    if (this.display === 'bySeries') {
      this.display = 'byTitle'
    } else {
      this.display = 'bySeries'
    }
    console.log('Display: ', this.display);
  }

}

