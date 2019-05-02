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
  selectedClass: string = null;

  constructor(
    public httpService: HttpService,
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
      course => {
        if (course !== undefined && course !== null) {
          this.httpService.getStuvEventsPerDay().subscribe(
            data => {
              console.log('Saving events to storage.');
              this.storage.set(environment.storageLocations.events, data);
            },
            error => {
              console.log(error);
            }
          );
          this.httpService.getLecturesForCourseTitlePerDay(this.selectedClass).subscribe(
            data => {
              console.log('Saving lectures to storage.');
              this.storage.set(environment.storageLocations.lectures, data).then(
                () => {
                  console.log('Lectures saved to storage.');
                  this.router.navigateByUrl('/lectures', { replaceUrl: true });
                },
                error => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  private getCourses() {
    this.httpService.getCourses().subscribe(
      data => {
        const courseList = data.map(e => e.title).sort();
        this.allCourses = this.utils.deepClone(courseList);
        this.resetCourses();
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

  loadEvents() {
    this.httpService.getStuvEventsPerDay().subscribe(
      data => {
        console.log('Saving events to storage.');
        this.storage.set(environment.storageLocations.events, data);
        console.log('Events saved to storage.');
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.storage.set(environment.storageLocations.course, this.selectedClass)
      .then(
        () => {
          this.httpService.getLecturesForCourseTitlePerDay(this.selectedClass).subscribe(
            data => {
              console.log('Saving lectures to storage.');
              this.storage.set(environment.storageLocations.lectures, data).then(
                () => {
                  console.log('Lectures saved to storage.');
                  this.router.navigateByUrl('/lectures');
                }
              );
            },
            error => {
              console.log(error);
            }
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
