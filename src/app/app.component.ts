import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { StoragesyncService } from './core/storagesync.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


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
    private storagesynservice: StoragesyncService,
    private backgroundMode: BackgroundMode

  ) {
    this.backgroundMode.enable();
    this.backgroundMode.on('activate').subscribe(() => {
      this.loadEventsAndLecturesIntoStorageContinuously();
    });
  }

  loadEventsAndLecturesIntoStorageContinuously() {
    this.storagesynservice.syncLectures();
    this.storagesynservice.syncEvents();
    setInterval(() => {
      this.storagesynservice.syncLectures();
      this.storagesynservice.syncEvents();
    }, 900000);
  }

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadEventsAndLecturesIntoStorageContinuously();
    });
  }
}
