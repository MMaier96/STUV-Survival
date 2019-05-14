import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseselectionPage } from './courseselection.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { CalendarEventPerDay } from '../../../models/calendar-event-per-day';
import { HttpService } from '../../../core/http.service';
import { Course } from '../../../models/course';
import { Utils } from '../../../helpers/utils';

class MockHttpService {
  getLecturesForCourseTitlePerDay(): Observable<CalendarEventPerDay> {
    return Observable.create();
  }
  getStuvEventsPerDay(): Observable<CalendarEventPerDay> {
    return Observable.create();
  }

  getCourses(): Observable<Course[]> {
    return Observable.create();
  }
}

class MockStorage {
  get(key: string): Promise<any> {
    return Promise.resolve();
  }

  set(key: string, value: string): Promise<any> {
    return Promise.resolve();
  }
}

describe('CourseselectionPage', () => {
  let component: CourseselectionPage;
  let fixture: ComponentFixture<CourseselectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseselectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: Storage, useValue: new MockStorage() },
        { provide: HttpService, useValue: new MockHttpService() },
        Utils
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseselectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
