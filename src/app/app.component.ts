import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { Router } from '@angular/router';
import { StorageService } from './core/storage.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.page.scss']
})
export class AppComponent implements OnInit {
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
    private storageService: StorageService,

    public storage: Storage,
    private backgroundMode: BackgroundMode

  ) {
    // this.backgroundMode.enable();
    // this.backgroundMode.on('activate').subscribe(() => {
    //   this.loadEventsAndLecturesIntoStorageContinuously();
    // });
  }

  loadEventsAndLecturesIntoStorageContinuously() {
    setInterval(() => {
      this.storageService.syncLecturesAsync();
      this.storageService.syncLecturesAsync();
    }, 900000);
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

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkIfCourseSelected();
      this.statusBar.styleLightContent();
      this.loadEventsAndLecturesIntoStorageContinuously();
    });
  }
}
