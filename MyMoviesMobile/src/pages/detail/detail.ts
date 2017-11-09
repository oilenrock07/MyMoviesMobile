import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Movie } from '../../models/movie';
import { Slide } from '../../models/slide';
import { SlideService } from '../../providers/slideservice';

import { StarRating } from '../../components/starrating';
import { IonicImageLoader } from 'ionic-image-loader';

import { MovieBasePage } from '../base/moviebasepage';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage extends MovieBasePage {
    public movie: Movie;
    imageBgSize: string = 'contain';
    relatedMovieSlides: Slide[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private slideService: SlideService) {
        super(alertCtrl);
        this.movie = navParams.get('mov');
        this.getRelatedMovies();
    }

    selectMovie(movie: Movie) {
        this.navCtrl.push(DetailPage, { mov: movie });
    }

    yearAndRating(movie: Movie): string {
        var rating = movie.Rating != '' && movie.Rating != undefined ? ' ' + movie.Rating : '';
        var runtime = movie.Runtime != '' && movie.Runtime != undefined ? ' ' + movie.Runtime : '';

        return movie.Year + rating + runtime;
    }

    private getRelatedMovies() {
        if (this.movie != null && this.movie.RelatedMovies.length > 0) {
            this.slideService.getRelatedMovies(this.movie.RelatedMovies).then(result => {
                this.relatedMovieSlides = result;
            });
        }
    }
}
