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
  criteria: string = '';
  imageBgSize: string = 'contain';
  page: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService,
    private moviesService: MovieService, private movieMockService: MovieMockService) {
    this._movieService = appService.isApp ? moviesService : movieMockService;
  }

  getItems(ev) {

    if (this.criteria != ev.target.value)
      this.page = 0;

    this.criteria = ev.target.value;
    if (!this.criteria || !this.criteria.trim()) {
      this.searchResult = [];
      return;
    }

    if (this.criteria.length < 3) return;
    this._movieService.searchMovies(this.criteria, this.page).then(result => {
      this.searchResult = result;
      this.page += 1;
    });
  }

  loadMoreSearchResult(infiniteScroll) {
    this._movieService.searchMovies(this.criteria, this.page).then(result => {
      if (result) {
        for (let movie of result) {
          this.searchResult.push(movie);          
        }
        this.page += 1;
      }
      infiniteScroll.complete();
    });
  }

  selectMovie(movie: Movie) {
    this.navCtrl.push(DetailPage, { mov: movie });
  }
}
