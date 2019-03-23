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

  loadedEvents: CalendarEventPerDay[];

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

  showAll() {
    this.events = this.loadedEvents;
  }

  showFromToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.events = this.loadedEvents.filter(e => e.Key >= today.getTime());
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this._httpService.getStuvEventsPerDay().then(e => {
      this.loadedEvents = e;
      this.showFromToday();
    });
  }

}
