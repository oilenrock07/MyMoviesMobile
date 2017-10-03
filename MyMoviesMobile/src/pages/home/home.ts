import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { SearchPage } from '../search/search';
import { AppService } from '../../providers/appservice';
import { SlideService } from '../../providers/slideservice';
import { DataService } from '../../providers/dataservice';
import { SettingService } from '../../providers/settingservice';
import { Movie } from '../../models/movie';
import { Slide } from '../../models/slide';

import { ImageComponent } from '../../components/imagecomponent';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: Array<Movie> = [];
  newSlides: Slide[] = [];

  lastNewMovieSlide: number = 0;
  appReady: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    private dataService: DataService, private appservice: AppService, private slideService: SlideService,
    private settingService: SettingService) {
    this.initialize();
  }

  initialize() {
    this.platform.ready().then(() => {

      this.dataService.connect().then(db => {
          this.appReady = true;
          this.slideService.getNewSlides(0).then(slides => {            
            this.newSlides = slides;
            this.setLastSlide(slides);
          });
      });
    });

  }

  searchToggle() {
    this.navCtrl.push(SearchPage);
  }

  reachLastSlide(type) {
    if (this.appReady && type == 'new' && this.newSlides.length <= this.settingService.SlideLimit) {
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
