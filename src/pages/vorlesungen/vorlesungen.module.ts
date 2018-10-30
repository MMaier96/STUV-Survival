import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { VorlesungenPage } from './vorlesungen';

@NgModule({
  declarations: [
    VorlesungenPage,
  ],
  imports: [
    IonicPageModule.forChild(VorlesungenPage),
  ],
})
export class VorlesungenPageModule { }
