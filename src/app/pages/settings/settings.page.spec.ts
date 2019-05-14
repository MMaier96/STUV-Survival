import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SettingsPage } from './settings.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage';

class MockStorage {
  get(key: string): Promise<any> {
    return Promise.resolve();
  }

  set(key: string, value: string): Promise<any> {
    return Promise.resolve();
  }
}

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
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

  beforeEach(async () => {
    fixture = await TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
