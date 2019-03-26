import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoragesyncService {

  constructor(
    private _httpService: HttpService,
    private _nativeStorage: NativeStorage
  ) {
  }

  syncLectures() {
    this._nativeStorage.getItem(environment.storageLocations.course).then(
      data => {
        if (data !== undefined || data !== null) {
          this._httpService.getLecturesForCourseTitlePerDay(data).then(lectures => {
            this._nativeStorage.setItem(environment.storageLocations.lectures, lectures)
              .then(
                error => console.error(error)
              );
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  syncEvents() {
    this._httpService.getStuvEventsPerDay().then(events => {
      this._nativeStorage.setItem(environment.storageLocations.events, events)
        .then(
          error => console.error(error)
        );
    });
  }
}
