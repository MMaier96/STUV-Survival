import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _httpService: HttpService,
    private storage: Storage
  ) {
  }

  async syncLecturesAsync(): Promise<void> {
    const course = await this.storage.get(environment.storageLocations.course);
    if (course !== undefined && course !== null) {
      const lectures = await this._httpService.getLecturesForCourseTitlePerDay(course);
      console.log('Saving lectures to storage.');
      return await this.storage.set(environment.storageLocations.lectures, lectures);
    } else {
      return;
    }
  }

  async syncEventsAsync(): Promise<void> {
    const events = await this._httpService.getStuvEventsPerDay();
    console.log('Saving events to storage.');
    return await this.storage.set(environment.storageLocations.events, events);
  }
}