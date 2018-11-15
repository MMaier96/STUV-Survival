import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lectures',
  templateUrl: 'lectures.page.html',
  styleUrls: ['lectures.page.scss'],
})

export class LecturesPage {

  constructor(
    public http:HttpService,
    public storage: Storage
  ){
    /*this.storage.get("selectedClass").then( className => {
      this.lecturesService.getLectures(className.toLowerCase()).subscribe( data => {
        console.log(data); // TODO: convert ics data to usefull json
      });
    });*/

  }
}
