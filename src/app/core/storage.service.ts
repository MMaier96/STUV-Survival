import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CalendarEventPerDay } from '../models/calendar-event-per-day';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _nativeStorage: NativeStorage
  ) {
  }

  getLectures(): CalendarEventPerDay[] {
    let lectures: CalendarEventPerDay[];
    this._nativeStorage.getItem(environment.storageLocations.lectures).then(
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
    this._nativeStorage.getItem(environment.storageLocations.events).then(
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
