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
  ];

  public externalPages = [
    {
      title: 'Cantine',
      externalUrl: 'https://www.studentenwerk.uni-heidelberg.de/sites/default/files/download/pdf/sp-mos-mensa-aktuell.pdf',
      icon: 'restaurant'
    },
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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('firstLogin').then( val => {
        this.firstLogin = val == undefined || val == false;
        console.log(this.firstLogin);
        this.router.navigateByUrl('/intro');
      });
    });
  }
}
