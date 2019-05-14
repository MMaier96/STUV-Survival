import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Storage } from '@ionic/storage';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CalendarEvent } from '../../models/calendar-event';
import * as ColorHash from 'color-hash';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage implements OnInit {
  private previousEventButton = {
    title: 'Previous Events',
    icon: 'time'
  };

  private currentEventButton = {
    title: 'Current Events',
    icon: 'undo'
  };

  filterButton = this.previousEventButton;

  loadedEvents: CalendarEventPerDay[] = null;

  events: CalendarEventPerDay[] = null;

  constructor(
    public _httpService: HttpService,
    public storage: Storage,
    private router: Router
  ) {
  }

  ngOnInit() {
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
    console.log('Loading events!');
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
    const startDate = new Date(event.Start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(event.End);
    endDate.setHours(0, 0, 0, 0);
    return endDate > startDate;
  }

  openEventDetails(event: CalendarEvent): void {
    this.router.navigate(['event-details'], { queryParams: { event: JSON.stringify(event) }});
  }
}
