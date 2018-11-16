import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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
    private storage: Storage,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('selectedClass').then( val => {
        this.firstLogin = val == undefined;
        if(this.firstLogin){
          this.router.navigateByUrl('/intro', { replaceUrl: true });
        }
      });
    });
  }
}
