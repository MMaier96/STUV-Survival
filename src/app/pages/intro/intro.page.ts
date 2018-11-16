import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Utils } from '../../services/utils'

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})

export class IntroPage implements OnInit{

  allCourses: any;
  filteredCourses: any;
  selectedClass;

  constructor(
    public http: HttpService,
    public storage: Storage,
    public router: Router,
    public utils: Utils
  ){
    http.getCourses().then( course => {
      var courseList = course.map( e => e.courseTitle).sort();

      this.allCourses = utils.deepClone(courseList);
      this.resetCourses();
    });
  }

  ngOnInit(){

  }
  onInput(event){
    this.resetCourses();
    var val = event.target.value;
    if (val && val.trim() !== '') {
      this.filteredCourses = this.filteredCourses.filter(function(courseName) {
        return courseName.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onSelect(selected){
    this.selectedClass = selected;
  }

  onSubmit(){
    this.storage.set("selectedClass", this.selectedClass);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  resetCourses(){
    this.filteredCourses = this.utils.deepClone(this.allCourses);
  }
}