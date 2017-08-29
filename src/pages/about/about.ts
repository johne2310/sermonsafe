import { Component } from '@angular/core';

import { IonicPage, PopoverController, NavParams } from 'ionic-angular';
import { Sermons } from '../../models/sermon.interface';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  conferenceDate = '2047-05-17';

  constructor(public navParams: NavParams, public popoverCtrl: PopoverController) {

  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ ev: event });
  }
}
