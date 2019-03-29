import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Storage } from '@ionic/storage';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import { MultilinePipe } from '../../pipe/multiline.pipe';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NavComponent } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { CalendarEvent } from '../../models/calendar-event';

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

  loadedEvents: CalendarEventPerDay[];

  events: CalendarEventPerDay[];

  constructor(
    public _httpService: HttpService,
    public storage: Storage,
    private router: Router,
    private navController: NavController
  ) {
  }

  showAll() {
    this.events = this.loadedEvents;
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

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.storage.get(environment.storageLocations.events).then(
      data => {
        this.loadedEvents = data;
        this.showFromToday();
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

  openEventDetails(eventID: String): void {
    this.router.navigate(['event-details', eventID]);
  }
}
