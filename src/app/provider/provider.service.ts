import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ProviderService {
    baseUrl = '/ics/calendars.list';
    classes;
    httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8'),
      responseType: 'text'
    };


    constructor(
      public http:HttpClient
    ) {
      this.loadClasses();
    }

    loadClasses(){
      var result = this.http.get(this.baseUrl, this.httpOptions)
          .subscribe(
              data => console.log(data)
          );
      console.log(result);
    }

    getClasses(){

    }

    getRawData() {
      var res = this.http.get(this.baseUrl);
      /*this.classes = this.res.split(".ics").join(".ics;").split(";");
      this.classes = this.classes.filter(function(value, index, Arr) {
          return index % 2 == 0;
      });
      for(var x = 1; x < this.classes.length;x++){
        this.classes[x] = this.classes[x].substr(1);
      }
      this.classes.splice(-1,1);
      this.classes.sort();*/
      return res;
    }
}
