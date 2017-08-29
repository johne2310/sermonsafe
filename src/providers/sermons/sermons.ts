import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { SermonSeries } from '../../models/sermon.interface';
import { SERMON_LIST } from '../../mocks/sermons.mocks';


@Injectable()
export class SermonsProvider {

  public sermonList: Array<SermonSeries> = [];

  constructor() {
    console.log('Hello SermonsProvider Provider');
  }

  loadSermons() {
    return this.sermonList = SERMON_LIST;
  }

}

