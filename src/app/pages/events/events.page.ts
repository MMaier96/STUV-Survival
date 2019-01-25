import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Storage } from '@ionic/storage';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage implements OnInit {

  events: CalendarEventPerDay[];

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

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this._httpService.getStuvEventsPerDay().then(e => {
      this.events = e;
    });
  }

}
