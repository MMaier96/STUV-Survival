import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private httpService: HttpService,
    private storage: Storage
  ) {
  }

  syncLectures() {
    this.storage.get(environment.storageLocations.course).then(
      course => {
        if (course === undefined && course === null) {
          this.httpService.getLecturesForCourseTitlePerDay(course).subscribe(
            data => {
              console.log('Saving lectures to storage.');
              this.storage.set(environment.storageLocations.lectures, data);
            }
          );
        }
      }
    );
  }

  syncEvents() {
    this.httpService.getStuvEventsPerDay().subscribe(
      data => {
        console.log('Saving events to storage.');
        this.storage.set(environment.storageLocations.events, data);
      }
    );
  }
}
