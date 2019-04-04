import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseselectionPage } from './courseselection.page';

describe('CourseselectionPage', () => {
  let component: CourseselectionPage;
  let fixture: ComponentFixture<CourseselectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseselectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
