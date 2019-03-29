import { Injectable } from '@angular/core';
import { CalendarEventPerDay } from '../models/calendar-event-per-day';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) {
  }

  getLectures(): CalendarEventPerDay[] {
    let lectures: CalendarEventPerDay[];
    this.storage.get(environment.storageLocations.lectures).then(
      data => {
        lectures = data;
      },
      error => {
        console.log(error);
        lectures = [];
      }
    );
    return lectures;
  }

  getEvents(): CalendarEventPerDay[] {
    let events: CalendarEventPerDay[];
    this.storage.get(environment.storageLocations.events).then(
      data => {
        events = data;
      },
      error => {
        console.log(error);
        events = [];
      }
    );
    return events;
  }
}
