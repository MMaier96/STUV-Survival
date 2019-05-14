import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EventsPage } from './events.page';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeModule } from '../../pipe/pipe.module';

import { Storage } from '@ionic/storage';

class MockStorage {
  get(key: string): Promise<any> {
    return Promise.resolve();
  }

  set(key: string, value: string): Promise<any> {
    return Promise.resolve();
  }
}

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        PipeModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: Storage, useValue: new MockStorage() }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
