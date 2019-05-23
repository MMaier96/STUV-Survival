import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: []
})
export class CoreModule { }
