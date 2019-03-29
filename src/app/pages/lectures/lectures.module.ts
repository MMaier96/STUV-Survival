import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LecturesPage } from './lectures.page';
import { CoreModule } from '../../core/core.module';
import { HttpService } from '../../core/http.service';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: LecturesPage
      }
    ])
  ],
  declarations: [LecturesPage],
  providers: [
    HttpService
  ]
})
export class LecturesPageModule {}
