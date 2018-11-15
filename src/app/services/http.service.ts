import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../global/variables';
import { Course } from '../objects/course';

const CourseRoute = 'courses';

@Injectable()
export class HttpService {

  private static SERVER = variables.backendUrl;

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
