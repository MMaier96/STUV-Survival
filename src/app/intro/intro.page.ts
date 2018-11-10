import { Component } from '@angular/core';
import { ProviderService } from '../provider/provider.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})

export class IntroPage {

  classes;

  constructor(
    public provider: ProviderService
  ){
    
  }
}
