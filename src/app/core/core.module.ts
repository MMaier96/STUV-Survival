import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    IonicStorageModule.forRoot(
      {
        name: 'survivalDB',
        driverOrder: ['websql', 'indexeddb', 'sqlite']
      }
    )
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: []
})
export class CoreModule { }
