import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { CalendarEventPerDay } from '../../models/calendar-event-per-day';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import * as ColorHash from 'color-hash';

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

  courseTitle: String = null;

  loadedLectures: CalendarEventPerDay[] = null;

  lectures: CalendarEventPerDay[] = null;

  constructor(
    public _httpService: HttpService,
    public storage: Storage,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadLectures();
  }

  showAll() {
    this.lectures = this.loadedLectures;
  }

  getBorderForText(text: String): String {
    const colorHash = new ColorHash({ hue: { min: 90, max: 270 } });
    text = text.replace('Vorlesung', '');
    text = text.replace('Klausur', '');
    text = text.trim();
    return '5px solid ' + colorHash.hex(text);
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

  loadLectures() {
    console.log('Loading lectures');
    this.storage.get(environment.storageLocations.lectures).then(
      (data: CalendarEventPerDay[]) => {
        if (data === null) {
          this.router.navigateByUrl('/intro', { replaceUrl: true });
        } else {
          this.loadedLectures = data;
          this.showFromToday();
          console.log('Lectures loaded');
        }
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/intro', { replaceUrl: true });
      }
    );
  }
}
