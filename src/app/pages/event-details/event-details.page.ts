import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../../models/calendar-event';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import * as ColorHash from 'color-hash';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage {

  id: String;
  event: CalendarEvent;

  constructor(
    private route: ActivatedRoute
  ) {
    this.resolveEventDetails();
  }
  resolveEventDetails() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.event = JSON.parse(queryParams.get('event'));
    });
  }
  isMultiDayEvent(event: CalendarEvent) {
    const startDate = new Date(event.Start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(event.End);
    endDate.setHours(0, 0, 0, 0);
    return endDate > startDate;
  }
}
