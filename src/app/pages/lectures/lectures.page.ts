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
  displayedLectures: CalendarEventPerDay[] = null;
  lectures: CalendarEventPerDay[] = null;

  displayedDays = environment.displayedEventDays;

  infiniteScrollEnabled = true;

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
    this.displayedLectures = this.loadedLectures;
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
      this.lectures = this.displayedLectures.slice(0, this.displayedDays);
      this.infiniteScrollEnabled = true;
    } else if (this.filterButton === this.currentEventButton) {
      this.showFromToday();
      this.filterButton = this.previousEventButton;
      this.lectures = this.displayedLectures.slice(0, this.displayedDays);
      this.infiniteScrollEnabled = true;
    }
  }

  showFromToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.displayedLectures = this.loadedLectures.filter(e => e.Key >= today.getTime());
  }

  loadMore(infiniteScroll: any) {
    this.displayedDays += environment.displayedEventDays;

    if (this.displayedDays >= this.displayedLectures.length) {
      this.lectures = this.displayedLectures;
      this.infiniteScrollEnabled = false;
    } else {
      if (this.filterButton === this.previousEventButton) {
        this.lectures = this.lectures.concat(
          this.displayedLectures.slice(this.displayedDays - environment.displayedEventDays, this.displayedDays)
        );
      }
      infiniteScroll.target.complete();
    }
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
          this.lectures = this.displayedLectures.slice(0, this.displayedDays);
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
