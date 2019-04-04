import { Component, OnInit, OnChanges } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  selectedClass: any;
  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.loadCourse();
      }
    });
  }

  ngOnInit() {
    this.loadCourse();
  }

  loadCourse() {
    this.storage.get(environment.storageLocations.course).then(
      course => {
        this.selectedClass = course;
        console.log('Loaded Course: ' + course);
      }
    );
  }

  changeCourse() {
    this.router.navigateByUrl('/courseselection', { replaceUrl: true });
  }
}
