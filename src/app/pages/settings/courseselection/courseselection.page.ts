import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'app-courseselection',
  templateUrl: './courseselection.page.html',
  styleUrls: ['./courseselection.page.scss'],
})
export class CourseselectionPage implements OnInit {

  allCourses: any;
  filteredCourses: any;
  selectedClass: string = null;

  constructor(
    private httpService: HttpService,
    public storage: Storage,
    public router: Router,
    public utils: Utils
  ) {
  }

  ngOnInit() {
    this.getCourses();
    this.storage.get(environment.storageLocations.course).then(
      course => {
        this.selectedClass = course;
        console.log('Loaded Course: ' + course);
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
    this.storage.set(environment.storageLocations.course, this.selectedClass)
      .then(
        () => {
          this.httpService.getStuvEventsPerDay().subscribe(
            data => {
              console.log('Saving events to storage.');
              this.storage.set(environment.storageLocations.events, data);
            }
          );
          this.httpService.getLecturesForCourseTitlePerDay(this.selectedClass).subscribe(
            data => {
              console.log('Saving lectures to storage.');
              this.storage.set(environment.storageLocations.lectures, data).then(
                () => this.router.navigateByUrl('/settings', { replaceUrl: true })
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

  onSubmit() {
    this.storage.set(environment.storageLocations.course, this.selectedClass)
      .then(
        () => {
          this.httpService.getStuvEventsPerDay().subscribe(
            data => {
              console.log('Saving events to storage.');
              this.storage.set(environment.storageLocations.events, data);
            }
          );
          this.httpService.getLecturesForCourseTitlePerDay(this.selectedClass).subscribe(
            data => {
              console.log('Saving lectures to storage.');
              this.storage.set(environment.storageLocations.lectures, data).then(
                () => this.router.navigateByUrl('/settings', { replaceUrl: true })
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
