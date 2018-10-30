import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { VorlesungenPage } from './vorlesungen';
import { IonicModule, Platform, NavController, NavParams} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavControllerMock, NavParamsMock } from '../../../test-config/mocks-ionic';

describe('VorlesungenPage', () => {
  let headerElement: DebugElement;
  let component: VorlesungenPage;
  let fixture: ComponentFixture<VorlesungenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VorlesungenPage],
      imports: [
        IonicModule.forRoot(VorlesungenPage)
      ],
      providers: [
        { provide: NavController, useClass: NavControllerMock },
        { provide: NavParams, useClass: NavParamsMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorlesungenPage);
    component = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('h3'));
  });

  it('should create fixture', () => expect(fixture).toBeDefined());

  it('should create component', () => expect(component).toBeDefined());

  it('should be a component VorlesungenPage', () => {
    expect(component instanceof VorlesungenPage).toBe(true);
  });
});
