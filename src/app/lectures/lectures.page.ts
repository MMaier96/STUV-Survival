import { Component } from '@angular/core';
import { ProviderService } from '../provider/provider.service';

@Component({
  selector: 'app-lectures',
  templateUrl: 'lectures.page.html',
  styleUrls: ['lectures.page.scss'],
})

export class LecturesPage {

  constructor(
    public service:ProviderService
  ){
    service.getRawData().subscribe( data => { 
      console.log(data)
    })
  }
}
