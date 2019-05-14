import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesPage } from './lectures.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';

class MockStorage {
  get(key: string): Promise<CalendarEventPerDay[]> {
    return Promise.resolve([]);
  }

  set(key: string, value: string): Promise<any> {
    return Promise.resolve();
  }
}

describe('LecturesPage', () => {
  let component: LecturesPage;
  let fixture: ComponentFixture<LecturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: Storage, useValue: new MockStorage() },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
