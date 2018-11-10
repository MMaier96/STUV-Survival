import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ProviderService {
    baseUrl = '/ics/calendars.list';

    constructor(
      public http:HttpClient
    ) { }

    getClasses(){
      return this.http.get(this.baseUrl, {responseType: 'text'});
    }
}
