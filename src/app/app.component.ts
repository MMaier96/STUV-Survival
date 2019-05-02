import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { Router } from '@angular/router';
import { StorageService } from './core/storage.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { environment } from '../environments/environment';
import { HttpService } from './core/http.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.page.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Lectures',
      url: '/lectures',
      icon: 'book'
    },
    {
      title: 'Events',
      url: '/events',
      icon: 'calendar'
    },
    {
      title: 'Cantine',
      url: '/cantine',
      icon: 'restaurant'
    }
  ];

  public externalPages = [
    {
      title: 'DHBW Mail',
      externalUrl: 'https://webmail.lehre.mosbach.dhbw.de/',
      icon: 'mail',
    },
    {
      title: 'Moodle',
      url: '/external',
      externalUrl: 'https://moodle.mosbach.dhbw.de',
      icon: 'notifications'
    },
    {
      title: 'Dualis',
      externalUrl: 'https://dualis.dhbw.de/',
      icon: 'school'
    }
  ];

  public firstLogin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private httpService: HttpService,

    public storage: Storage

  ) {
    this.initializeApp();
    this.loadEventsAndLecturesIntoStorageContinuously();
  }

  loadEventsAndLecturesIntoStorageContinuously() {
    setInterval(() => {
      this.loadEventsIntoStorage();
      this.loadLecturesIntoStorage();
    }, 900000);
  }

  loadEventsIntoStorage() {
    this.httpService.getStuvEventsPerDay().subscribe(
      data => {
        console.log('Saving events to storage.');
        this.storage.set(environment.storageLocations.events, data);
        console.log('Events saved to storage');
      }
    );
  }

  loadLecturesIntoStorage() {
    return this.storage.get(environment.storageLocations.course).then(
      course => {
        if (course === undefined && course === null) {
          this.httpService.getLecturesForCourseTitlePerDay(course).subscribe(
            data => {
              console.log('Saving lectures to storage.');
              this.storage.set(environment.storageLocations.lectures, data);
            }
          );
        }
      }
    );
  }

  checkIfCourseSelected() {
    this.storage.get(environment.storageLocations.course).then(
      data => {
        if (data !== undefined && data !== null) {
          this.splashScreen.hide();
          this.router.navigateByUrl('/lectures', { replaceUrl: true });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkIfCourseSelected();
      this.statusBar.styleLightContent();
      this.loadEventsIntoStorage();
      this.loadLecturesIntoStorage().then(
          () => this.router.navigateByUrl('/lectures', { replaceUrl: true })
      );
    });
  }
}
