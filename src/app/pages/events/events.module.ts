import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonIcon } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { EventsPage } from './events.page';
import { CoreModule } from '../../core/core.module';
import { HttpService } from '../../core/http.service';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  imports: [
    CoreModule,
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
  declarations: [EventsPage],
  providers: [
    HttpService
  ]
})
export class EventsPageModule {}
