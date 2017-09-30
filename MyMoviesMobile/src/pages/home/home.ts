import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { AppService } from '../../providers/appservice';
import { SlideService } from '../../providers/slideservice';
import { Movie } from '../../models/movie';
import { Slide } from '../../models/slide';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: Array<Movie> = [];
  newSlides: Slide[] = [];

  slideLimit = 4; //200;
  lastNewMovieSlide: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appservice: AppService, private slideService: SlideService) {
    slideService.getNewSlides(0).then(slides => {
      this.newSlides = slides;
      this.setLastSlide(slides);
    });
  }

  searchToggle() {
    this.navCtrl.push(SearchPage);
  }

  reachLastSlide(type) {
    if (type == 'new' && this.newSlides.length <= this.slideLimit) {
      this.slideService.getNewSlides(this.lastNewMovieSlide).then(slides => {        
        Array.prototype.push.apply(this.newSlides, slides);
        this.setLastSlide(slides);
      });
    }
  }

  private setLastSlide(slides: Slide[]) {
    if (slides.length == 0) return;
    var lastSlide = slides[slides.length - 1];
    var lastMovie = lastSlide.Movies[lastSlide.Movies.length - 1];
    this.lastNewMovieSlide = lastMovie.MovieId;
  }
}
