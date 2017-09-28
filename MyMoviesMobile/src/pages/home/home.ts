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
  newSlides: Array<Slide[]> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appservice: AppService, private slideService: SlideService) {
    slideService.getNewSlides(0).then(slides => {
      this.newSlides = slides;
    });
  }

  searchToggle() {
    this.navCtrl.push(SearchPage);
  }

  reachLastSlide(type) {
    if (type == 'new') {

    }

  }
}
