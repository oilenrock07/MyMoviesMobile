import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { AppService } from '../../providers/appservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  appService: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, appservice: AppService) {
    this.appService = appservice;
  }

  searchToggle() {
    this.navCtrl.push(SearchPage);
  }
}
