import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lectures',
  templateUrl: 'lectures.page.html',
  styleUrls: ['lectures.page.scss'],
})

export class LecturesPage implements OnInit {

  private previousEventButton = {
    title: 'Previous Events',
    icon: 'time'
  };

  private currentEventButton = {
    title: 'Current Events',
    icon: 'undo'
  };

  filterButton = this.previousEventButton;

  courseTitle: String;

  loadedLectures: CalendarEventPerDay[];

  lectures: CalendarEventPerDay[];

  constructor(
    public _httpService: HttpService,
    public storage: Storage,
    private router: Router
  ) {
  }

  showAll() {
    this.lectures = this.loadedLectures;
  }

  switchTimeView() {
    if (this.filterButton === this.previousEventButton) {
      this.showAll();
      this.filterButton = this.currentEventButton;
    } else if (this.filterButton === this.currentEventButton) {
      this.showFromToday();
      this.filterButton = this.previousEventButton;
    }
  }

  showFromToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.lectures = this.loadedLectures.filter(e => e.Key >= today.getTime());
  }

  ngOnInit() {
    this.storage.get(environment.storageLocations.course).then(
      data => {
        if (data === undefined || data === null) {
          console.log(data);
          this.router.navigateByUrl('/intro', { replaceUrl: true });
        } else {
          this.courseTitle = data;
          this.loadLectures();
        }
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/intro', { replaceUrl: true });
      }
    );
  }

  loadLectures() {
    this.storage.get(environment.storageLocations.lectures).then(
      data => {
        this.loadedLectures = data;
        this.showFromToday();
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/intro', { replaceUrl: true });
      }
    );
  }
}
