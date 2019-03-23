import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../core/http.service';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';

@Component({
  selector: 'app-lectures',
  templateUrl: 'lectures.page.html',
  styleUrls: ['lectures.page.scss'],
})

export class LecturesPage implements OnInit {

  loadedLectures: CalendarEventPerDay[];

  lectures: CalendarEventPerDay[];

  constructor(
    public _httpService: HttpService,
    public storage: Storage
  ) {
    /*this.storage.get("selectedClass").then( className => {
      this.lecturesService.getLectures(className.toLowerCase()).subscribe( data => {
        console.log(data); // TODO: convert ics data to usefull json
      });
    });*/

  }

  showAll() {
    this.lectures = this.loadedLectures;
  }

  showFromToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.lectures = this.loadedLectures.filter(e => e.Key >= today.getTime());
  }

  ngOnInit() {
    this.loadLectures();
  }

  loadLectures() {
    this._httpService.getLecturesForCourseTitlePerDay('inf16a').then(l => {
      this.loadedLectures = l;
      this.showFromToday();
    });
  }
}
