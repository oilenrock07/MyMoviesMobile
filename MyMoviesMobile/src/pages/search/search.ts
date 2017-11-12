import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../providers/appservice';
import { MovieService } from '../../providers/movieservice';
import { MovieMockService } from '../../providers/moviemockservice';

import { DetailPage } from '../detail/detail';

import { IMovieService } from '../../interfaces/imovieservice'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private readonly _movieService: IMovieService;
  searchResult: Movie[] = [];
  imageBgSize: string = 'contain';

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService,
    private moviesService: MovieService, private movieMockService: MovieMockService) {
    this._movieService = appService.isApp ? moviesService : movieMockService;
  }

  getItems(ev) {
    let criteria = ev.target.value;
    if (!criteria || !criteria.trim()) {
      this.searchResult = [];
      return;
    }

    if (criteria.length < 3) return;
    this._movieService.searchMovies(criteria).then(result => {
      this.searchResult = result;
    });
  }

  selectMovie(movie: Movie) {
    this.navCtrl.push(DetailPage, { mov: movie });
  }
}
