import { async, TestBed }         from '@angular/core/testing';
import { By }                     from '@angular/platform-browser';
import { IonicModule, Platform }  from 'ionic-angular';

import { StatusBar }              from '@ionic-native/status-bar';
import { SplashScreen }           from '@ionic-native/splash-screen';

import { MyApp }                  from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
}                                 from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;
  let titleElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    titleElement = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('should have title "STUV Survival"', () => {
    const title = titleElement.nativeElement;
    expect(title.innerText).toMatch("Menu");
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });
});
