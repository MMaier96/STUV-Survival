import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { EventsPage } from './events.page';
import { CoreModule } from '../../core/core.module';
import { HttpService } from '../../core/http.service';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventsPage
      }
    ])
  ],
  declarations: [EventsPage],
  providers: [
    HttpService
  ]
})
export class EventsPageModule {}
