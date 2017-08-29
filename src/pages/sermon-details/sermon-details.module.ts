import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SermonDetailsPage } from './sermon-details';

@NgModule({
  declarations: [
    SermonDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SermonDetailsPage),
  ],
})
export class SermonDetailsPageModule {}
