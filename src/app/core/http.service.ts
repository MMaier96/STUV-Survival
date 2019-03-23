import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../models/calendar-event';
import { Course } from '../models/course';
import { CalendarEventPerDay } from '../models/calendar-event-per-day';

const CourseRoute = 'courses';
const EventsRoute = 'events';
const LecturesForCourseRoute = 'lectures/';
const ByDayRoute = 'byDay';

@Injectable()
export class HttpService {

  private static SERVER = environment.backendUrl;

  constructor(private httpClient: HttpClient) { }

  getCourses(): Promise<Course[]> {
    return this.httpClient.get<Course[]>(HttpService.SERVER + CourseRoute)
    .toPromise()
    .catch(this.handleError);
  }

  getStuvEvents(): Promise<CalendarEvent[]> {
    return this.httpClient.get<CalendarEvent[]>(HttpService.SERVER + EventsRoute)
    .toPromise()
    .catch(this.handleError);
  }

  getStuvEventsPerDay(): Promise<CalendarEventPerDay[]> {
    return this.httpClient.get<CalendarEventPerDay[]>(HttpService.SERVER + EventsRoute + '/' + ByDayRoute)
    .toPromise()
    .catch(this.handleError);
  }

  getLecturesForCourseTitle(courseTitel: String): Promise<CalendarEvent[]> {
    return this.httpClient.get<CalendarEvent[]>(HttpService.SERVER + LecturesForCourseRoute + courseTitel)
    .toPromise()
    .catch(this.handleError);
  }

  getLecturesForCourseTitlePerDay(courseTitel: String): Promise<CalendarEventPerDay[]> {
    return this.httpClient.get<CalendarEventPerDay[]>(HttpService.SERVER + LecturesForCourseRoute + ByDayRoute + '/' + courseTitel)
    .toPromise()
    .catch(this.handleError);
  }

  getLecturesForCourse(course: Course): Promise<CalendarEvent[]> {
    return this.httpClient.get<CalendarEvent[]>(HttpService.SERVER + LecturesForCourseRoute + course.title)
    .toPromise()
    .catch(this.handleError);
  }

  getLecturesForCoursePerDay(course: Course): Promise<CalendarEventPerDay[]> {
    return this.httpClient.get<CalendarEventPerDay[]>(HttpService.SERVER + LecturesForCourseRoute + ByDayRoute + '/' + course.title)
    .toPromise()
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
