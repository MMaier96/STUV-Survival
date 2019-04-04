import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/storage.service';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'app-courseselection',
  templateUrl: './courseselection.page.html',
  styleUrls: ['./courseselection.page.scss'],
})
export class CourseselectionPage implements OnInit {

  allCourses: any;
  filteredCourses: any;
  selectedClass: any;

  constructor(
    private http: HttpService,
    public storage: Storage,
    public router: Router,
    public utils: Utils,
    private storageService: StorageService,
  ) {
    this.getCourses();
    this.storage.get(environment.storageLocations.course).then(
      course => {
        this.selectedClass = course;
        console.log('Loaded Course: ' + course);
      }
    );
  }

  ngOnInit() {
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
    this.storage.set(environment.storageLocations.course, this.selectedClass)
      .then(
        () => {
          this.storageService.syncEventsAsync();
          this.storageService.syncLecturesAsync();
          this.router.navigateByUrl('/settings', { replaceUrl: true });
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
          this.storageService.syncEventsAsync();
          this.storageService.syncLecturesAsync();
          this.router.navigateByUrl('/settings', { replaceUrl: true });
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
