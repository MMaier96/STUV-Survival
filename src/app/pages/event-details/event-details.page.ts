import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../../models/calendar-event';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage {

  id: String;
  event: CalendarEvent;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute
  ) {
    this.resolveEventDetails();
  }

  resolveEventDetails() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== undefined && this.id !== null) {
      this.storage.get(environment.storageLocations.events).then(
        (data: CalendarEventPerDay[]) => {
          this.event = data.flatMap(eventPerDay => eventPerDay.Content).find(event => event.UID === this.id);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
