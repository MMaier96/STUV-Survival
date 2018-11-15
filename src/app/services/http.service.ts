import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Course } from '../objects/course';

const CourseRoute = 'courses';

@Injectable()
export class HttpService {

  private static SERVER = environment.backendUrl;

  constructor(private httpClient: HttpClient) { }

  getCourses(): Promise<Course[]> {
    return this.httpClient.get<Course[]>(HttpService.SERVER + CourseRoute)
    .toPromise()
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
