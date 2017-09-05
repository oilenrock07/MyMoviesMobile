import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { AppService } from '../../providers/appservice';
import { Movie } from '../../models/movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  appService: any;
  movies: Array<Movie> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, appservice: AppService) {
    this.appService = appservice;
    this.movies.push(new Movie({MovieName: "Spider Man", ImdbId: "1234", Poster: ""}));
    this.movies.push(new Movie({MovieName: "Spider Man 2", ImdbId: "1234", Poster: ""}));
    this.movies.push(new Movie({MovieName: "Spider Man 3", ImdbId: "1234", Poster: ""}));
  }

  searchToggle() {
    this.navCtrl.push(SearchPage);
  }
}
