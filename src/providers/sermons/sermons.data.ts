import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { SERMON_LIST } from '../../mocks/sermons.mocks';
import { SermonSeries } from '../../models/sermon.interface';


@Injectable()
export class SermonsProvider {

  public sermonSeriesList: Array<SermonSeries> = [];
  public sermonTitleList: Array<any> = [];
  constructor() {
    console.log('Hello SermonsProvider Provider');
  }

  loadSermons() {
    return this.sermonSeriesList = SERMON_LIST;
  }

  loadSermon() {
    this.sermonTitleList = [];
    this.sermonSeriesList.forEach(data => {
      let result = data.sermon.map(item => {
        return this.sermonTitleList.push(item);
        // return item;
      });
      console.log('titles', this.sermonTitleList);
    });
  }

  findSermonSeries(queryText) {
    //trim search value to ensure result is returned if additional spaces are typed
    let val = queryText.trim();

    // search by series
    if (val !== '') {
      return this.sermonSeriesList.filter((item) => {
        return item.series.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      return this.sermonSeriesList;
    }
  }

  findSermonTitle(searchTerm) {
    //trim search value to ensure result is returned if additional spaces are typed
    this.loadSermon();
    let val = searchTerm.trim();
    if (val !== '') {
      return this.sermonTitleList.filter((item) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      return this.sermonTitleList; // = [];
      // return this.loadSermon();
    }
  }

}

