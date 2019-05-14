import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsPage } from './event-details.page';
import { PipeModule } from '../../pipe/pipe.module';
import { RouterModule, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../../models/calendar-event';

class ActivatedRouteStub {

    private subjectParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
    paramMap = this.subjectParamMap.asObservable();

    private _testParamMap: ParamMap;
    get testParamMap() {
        return this._testParamMap;
    }
    set testParamMap(params: {}) {
        this._testParamMap = convertToParamMap(params);
        this.subjectParamMap.next(this._testParamMap);
    }

    private subjectQueryParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
    queryParamMap = this.subjectQueryParamMap.asObservable();

    private _testQueryParamMap: ParamMap;
    get testQueryParamMap() {
        return this._testQueryParamMap;
    }
    set testQueryParamMap(params: {}) {
        this._testQueryParamMap = convertToParamMap(params);
        this.subjectQueryParamMap.next(this._testQueryParamMap);
    }

    get snapshot() {
        return {
            paramMap: this.testParamMap,
            queryParamMap: this.testQueryParamMap
        };
    }

}

describe('EventDetailsPage', () => {
  let component: EventDetailsPage;
  let fixture: ComponentFixture<EventDetailsPage>;

  const testEvent: CalendarEvent = {
    UID: '123123',
    Summary: 'dsfsfd',
    Description: 'sdffds',
    Start: 12345,
    End: 12345,
    Location: 'IISI',
    OrganisationDay: 0,
    Creation: 0,
    LastModified: 0
  };

  const activatedRouteStub = new ActivatedRouteStub();
  activatedRouteStub.testParamMap = {
    event: JSON.stringify(testEvent)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ PipeModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
