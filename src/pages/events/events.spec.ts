import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EventsPage } from './events';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

describe('EventsPage', () => {
  let headerElement: DebugElement;
  let titleElement: DebugElement;
  let comp: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsPage],
      imports: [
        IonicModule.forRoot(EventsPage)
      ],
      providers: [
        NavController
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPage);
    comp = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('h3'));
    titleElement = fixture.debugElement.query(By.css('ion-title'));
  });

  it('should create fixture', () => expect(fixture).toBeDefined());

  it('should create component', () => expect(comp).toBeDefined());

  it('should be a component EventsPage', () => {
    expect(comp instanceof EventsPage).toBe(true);
  });

  it('should have title Events', () => {
    fixture.detectChanges();
    const title = titleElement.nativeElement;
    expect(title.innerText).toMatch("Events");
  });

  it('should have expected <h3> text', () => {
    fixture.detectChanges();
    const h3 = headerElement.nativeElement;
    expect(h3.innerText).toMatch(/ionic/i,
      '<h3> should say something about "Ionic"');
  });
});
