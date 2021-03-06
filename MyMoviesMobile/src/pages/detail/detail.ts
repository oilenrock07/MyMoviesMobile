import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Movie } from '../../models/movie';
import { Slide } from '../../models/slide';
import { SlideService } from '../../providers/slideservice';

import { StarRating } from '../../components/starrating';
import { IonicImageLoader } from 'ionic-image-loader';

import { SearchPage } from '../search/search';
import { MovieBasePage } from '../base/moviebasepage';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage extends MovieBasePage {
    public movie: Movie;
    imageBgSize: string = 'contain';
    showStarRating: boolean = true;
    relatedMovieSlides: Slide[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private slideService: SlideService) {
        super(alertCtrl);
        this.movie = navParams.get('mov');
        this.getRelatedMovies();
    }

    selectMovie(movie: Movie) {
        this.navCtrl.push(DetailPage, { mov: movie });
    }

    searchToggle() {
        this.navCtrl.push(SearchPage);
    }

    yearAndRating(movie: Movie): string {
        var rating = movie.Rating != '' && movie.Rating != undefined ? ' ' + movie.Rating : '';
        var runtime = movie.Runtime != '' && movie.Runtime != undefined ? ' ' + movie.Runtime : '';

        return movie.Year + rating + runtime;
    }

    private getRelatedMovies() {
        if (this.movie != null && this.movie.RelatedMovie && this.movie.RelatedMovie.length > 0) {
            this.slideService.getRelatedMovies(this.movie.RelatedMovie).then(result => {
                this.relatedMovieSlides = result;
            });
        }
    }
}
