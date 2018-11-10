import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider/provider.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})

export class IntroPage implements OnInit{

  result: any;
  filteredResults: any;
  selectedClass;

  constructor(
    public provider: ProviderService
  ){
    provider.getClasses().subscribe(data => {
      var dataArr: String[] = this.splitDataByNewLine(data);
      dataArr = this.removeNewLines(dataArr);
      dataArr.sort();
      dataArr = this.filterIncorrectData(dataArr);
      this.result = dataArr;
      this.filteredResults = dataArr;
    });
  }

  ngOnInit(){

  }
  onInput(event){
    var val = event.target.value;
    if (val && val.trim() !== '') {
      this.filteredResults = this.filteredResults.filter(function(item) {
        return item.class.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onSubmit(selected){
    this.selectedClass = selected;
  }
  splitDataByNewLine(data){
    return data.split(/(\r\n|\n|\r)/gm);
  }

  removeNewLines(data){
    return data.filter(function(value, index, Arr) {
        return index % 2 == 0;
    });
  }

  filterIncorrectData(data){
    for(var i = 0; i < data.length; i++){
      var splitIndex = data[i].split(";");
      if(splitIndex.length == 2 && splitIndex[0].length > 1 && splitIndex[1].length > 1 && splitIndex[0] != "CALENDARS"){
        data[i] = { "class": splitIndex[0], "url": splitIndex[1]};
      }else{
        data[i]  = "ERROR!";
      }
    }
    data = data.filter(function(value, index, Arr) {
        return value != "ERROR!";
    });
    return data
  }
}
