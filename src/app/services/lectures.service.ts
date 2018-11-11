import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class LecturesService {
    baseUrl = '/ics/';

    constructor(
      public http: HttpClient
    ) {
    }

    getLectures(className){
      return this.http.get(this.baseUrl + className + ".ics", {responseType: 'text'});
    }
}
