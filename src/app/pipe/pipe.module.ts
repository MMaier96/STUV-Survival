import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultilinePipe } from './multiline.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MultilinePipe
  ],
  declarations: [MultilinePipe]
})
export class PipeModule { }
