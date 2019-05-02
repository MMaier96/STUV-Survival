import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../models/calendar-event';
import { Course } from '../models/course';
import { CalendarEventPerDay } from '../models/calendar-event-per-day';
import { map } from 'rxjs/operators';

const CourseRoute = 'courses';
const EventsRoute = 'events';
const LecturesForCourseRoute = 'lectures/';
const ByDayRoute = 'byDay';

@Injectable()
export class HttpService {

  private static SERVER = environment.backendUrl;

  constructor(private httpClient: HttpClient) { }

  getCourses() {
    return this.httpClient.get(HttpService.SERVER + CourseRoute)
    .pipe(
      map((courses: Course[]) => {
        return courses;
      })
    );
  }

  getStuvEventsPerDay() {
    return this.httpClient.get(HttpService.SERVER + EventsRoute + '/' + ByDayRoute)
    .pipe(
      map((events: CalendarEventPerDay[]) => {
        return events;
      })
    );
  }

  getLecturesForCourseTitlePerDay(courseTitel: String) {
    return this.httpClient
    .get(HttpService.SERVER + LecturesForCourseRoute + ByDayRoute + '/' + courseTitel.toLowerCase())
    .pipe(
      map((lectures: CalendarEventPerDay[]) => {
        return lectures;
      })
    );
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
