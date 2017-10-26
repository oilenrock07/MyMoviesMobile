import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Movie } from '../../models/movie';

import { StarRating } from '../../components/starrating';
import { IonicImageLoader  } from 'ionic-image-loader';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {
    public movie: Movie;
    constructor(public navCtrl: NavController, public navParams: NavParams) {    
        this.movie = navParams.get('mov');
    }

    yearAndRating(movie: Movie): string {
        var rating = movie.Rating != '' && movie.Rating != undefined ? ' ' + movie.Rating : '';
        var runtime = movie.Runtime != '' && movie.Runtime != undefined ? ' ' + movie.Runtime : '';

        return movie.Year + rating + runtime;
    }
}
