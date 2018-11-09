import { Component } from '@angular/core';
import { ProviderService } from '../provider/provider.service';

@Component({
  selector: 'app-lectures',
  templateUrl: 'lectures.page.html',
  styleUrls: ['lectures.page.scss'],
})

export class LecturesPage {

  classes;

  constructor(
    public service:ProviderService
  ){
    this.classes = service.getRawData();
  }
}
