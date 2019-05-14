import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroPage } from './intro.page';
import { Observable } from 'rxjs';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import { Course } from '../../models/course';
import { HttpService } from '../../core/http.service';
import { CoreModule } from '../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Utils } from '../../helpers/utils';
import { Storage } from '@ionic/storage';

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

describe('IntroPage', () => {
  let component: IntroPage;
  let fixture: ComponentFixture<IntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CoreModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: HttpService, useValue: new MockHttpService() },
        { provide: Storage, useValue: new MockStorage() },
        Utils
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
