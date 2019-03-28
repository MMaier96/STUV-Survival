import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StoragesyncService {

  constructor(
    private _httpService: HttpService,
    private storage: Storage
  ) {
  }

  syncLectures() {
    this.storage.get(environment.storageLocations.course).then(
      data => {
        if (data !== undefined || data !== null) {
          this._httpService.getLecturesForCourseTitlePerDay(data).then(lectures => {
            this.storage.set(environment.storageLocations.lectures, lectures)
              .then(
                () => console.log('Lectures saved to storage'),
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
      this.storage.set(environment.storageLocations.events, events)
        .then(
          error => console.error(error)
        );
    });
  }

  // syncLectures() {
  //   this._nativeStorage.getItem(environment.storageLocations.course).then(
  //     data => {
  //       if (data !== undefined || data !== null) {
  //         this._httpService.getLecturesForCourseTitlePerDay(data).then(lectures => {
  //           this._nativeStorage.setItem(environment.storageLocations.lectures, lectures)
  //             .then(
  //               error => console.error(error)
  //             );
  //         });
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // syncEvents() {
  //   this._httpService.getStuvEventsPerDay().then(events => {
  //     this._nativeStorage.setItem(environment.storageLocations.events, events)
  //       .then(
  //         error => console.error(error)
  //       );
  //   });
  // }
}
