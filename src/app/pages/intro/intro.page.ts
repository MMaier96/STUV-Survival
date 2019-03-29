import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Utils } from '../../helpers/utils';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StoragesyncService } from '../../core/storagesync.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})

export class IntroPage implements OnInit {

  allCourses: any;
  filteredCourses: any;
  selectedClass: any;

  constructor(
    public http: HttpService,
    public storage: Storage,
    public router: Router,
    public utils: Utils,
    private storageSync: StoragesyncService,
  ) {
    http.getCourses().then(course => {
      const courseList = course.map(e => e.title).sort();

      this.allCourses = utils.deepClone(courseList);
      this.resetCourses();
    });
  }

  ngOnInit() {
    this.storage.get(environment.storageLocations.course).then(
      data => {
        if (data !== undefined && data !== null) {
          this.storageSync.syncEventsAsync();
          this.storageSync.syncLecturesAsync().then(
            () => this.router.navigateByUrl('/lectures', { replaceUrl: true }),
            error => console.error(error)
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onInput(event: { target: { value: any; }; }) {
    this.resetCourses();
    const val = event.target.value;
    if (val && val !== undefined && val.trim() !== '') {
      this.filteredCourses = this.filteredCourses.filter(courseName =>
        courseName.toLowerCase().includes(val.toLowerCase())
      );
    }
  }

  onSelect(selected: any) {
    this.selectedClass = selected;
  }

  onSubmit() {
    this.storage.set(environment.storageLocations.course, this.selectedClass)
    .then(
      () => {
        this.storageSync.syncEventsAsync();
        this.storageSync.syncLecturesAsync().then(
          () => this.router.navigateByUrl('/lectures', { replaceUrl: true })
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  resetCourses() {
    this.filteredCourses = this.utils.deepClone(this.allCourses);
  }
}
