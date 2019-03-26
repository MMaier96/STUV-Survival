import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoragesyncService {

  constructor(
    public _httpService: HttpService,
    public storage: Storage
  ) { }

  syncLectures() {
    this.storage.get(environment.storageLocations.course).then((courseTitle) => {
      if (courseTitle !== undefined || courseTitle !== null) {
        this._httpService.getLecturesForCourseTitlePerDay(courseTitle).then(lectures => {
          this.storage.set(environment.storageLocations.lectures, lectures);
        });
      }
    });
  }

  syncEvents() {
    this._httpService.getStuvEventsPerDay().then(events => {
      this.storage.set(environment.storageLocations.events, events);
    });
  }
}
