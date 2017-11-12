import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Movie } from '../../models/movie';
import { AppService } from '../../providers/appservice';
import { MovieService } from '../../providers/movieservice';
import { MovieMockService } from '../../providers/moviemockservice';

import { DetailPage } from '../detail/detail';
import { MovieBasePage } from '../base/moviebasepage';
import { IMovieService } from '../../interfaces/imovieservice'

@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage extends MovieBasePage {

    private readonly _movieService: IMovieService;
    searchResult: Movie[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private appService: AppService,
        private moviesService: MovieService, private movieMockService: MovieMockService) {
        super(alertCtrl);
        this._movieService = appService.isApp ? moviesService : movieMockService;
        this.loadMovies(navParams.get('type'));
    }

    selectMovie(movie: Movie) {
        this.navCtrl.push(DetailPage, { mov: movie });
    }

    loadMovies(type: string) {
        this._movieService.searchMoviesByCategory(type).then(result => {
            this.searchResult = result;
        });
    }
}
