import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ProviderService {
    baseUrl: string;

    constructor(
      public http:HttpClient
    ) {
        this.baseUrl = 'http://ics.mosbach.dhbw.de/ics/calendars.list';
    }

    getRawData() {
      return this.http.get(this.baseUrl);
    }
}
