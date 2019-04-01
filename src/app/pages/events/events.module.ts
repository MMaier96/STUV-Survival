import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonIcon } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../../pipe/pipe.module';

import { EventsPage } from './events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: EventsPage
      }
    ]),
    PipeModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
