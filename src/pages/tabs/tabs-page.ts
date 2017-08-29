import { Component } from '@angular/core';

import { IonicPage, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: string = 'SermonsPage';
  tab2Root: string = 'SchedulePage';
  tab3Root: string = 'SpeakerListPage';
  tab4Root: string = 'AboutPage';
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
