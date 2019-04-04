import { Component } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Storage } from '@ionic/storage';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CalendarEvent } from '../../models/calendar-event';
import { MultilinePipe } from '../../pipe/multiline.pipe';
import * as ColorHash from 'color-hash';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage {
  private previousEventButton = {
    title: 'Previous Events',
    icon: 'time'
  };

  private currentEventButton = {
    title: 'Current Events',
    icon: 'undo'
  };

  filterButton = this.previousEventButton;

  loadedEvents: CalendarEventPerDay[];

  events: CalendarEventPerDay[];

  constructor(
    public _httpService: HttpService,
    public storage: Storage,
    private router: Router
  ) {
    this.loadEvents();
  }

  showAll() {
    this.events = this.loadedEvents;
  }

  getBorderForText(text: String): String {
    const colorHash = new ColorHash({hue: {min: 90, max: 270}});
    text = text.trim();
    return '5px solid ' + colorHash.hex(text);
  }

  switchTimeView() {
    if (this.filterButton === this.previousEventButton) {
      this.showAll();
      this.filterButton = this.currentEventButton;
    } else if (this.filterButton === this.currentEventButton) {
      this.showFromToday();
      this.filterButton = this.previousEventButton;
    }
  }

  showFromToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.events = this.loadedEvents.filter(e => e.Key >= today.getTime());
  }

  loadEvents() {
    this.storage.get(environment.storageLocations.events).then(
      data => {
        if (data !== null && data !== undefined) {
          this.loadedEvents = data;
          this.showFromToday();
        } else {
          console.log('Error: Events null or undefined in storage.');
        }
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/intro', { replaceUrl: true });
      }
    );
  }

  isMultiDayEvent(event: CalendarEvent) {
    return new Date(event.End).getDate > new Date(event.Start).getDate;
  }

  openEventDetails(event: CalendarEvent): void {
    this.router.navigate(['event-details'], { queryParams: { event: JSON.stringify(event) }});
  }
}
