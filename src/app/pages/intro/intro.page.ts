import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Utils } from '../../helpers/utils';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../core/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})

export class IntroPage {

  allCourses: any;
  filteredCourses: any;
  selectedClass: any;

  constructor(
    public http: HttpService,
    public storage: Storage,
    public router: Router,
    public utils: Utils,
    private storageService: StorageService,
  ) {
    this.checkIfCourseSelected();
    this.getCourses();
  }

  private checkIfCourseSelected() {
    this.storage.get(environment.storageLocations.course).then(
      data => {
        if (data !== undefined && data !== null) {
          this.storageService.syncEventsAsync();
          this.storageService.syncLecturesAsync().then(
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

  private getCourses() {
    this.http.getCourses().then(course => {
      const courseList = course.map(e => e.title).sort();

      this.allCourses = this.utils.deepClone(courseList);
      this.resetCourses();
    });
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
        this.storageService.syncEventsAsync();
        this.storageService.syncLecturesAsync().then(
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
