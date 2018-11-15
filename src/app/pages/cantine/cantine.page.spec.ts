import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantinePage } from './cantine.page';

describe('CantinePage', () => {
  let component: CantinePage;
  let fixture: ComponentFixture<CantinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
