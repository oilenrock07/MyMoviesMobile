import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { SearchPage } from '../search/search';
import { DetailPage } from '../detail/detail';
import { AppService } from '../../providers/appservice';
import { SlideService } from '../../providers/slideservice';
import { DataService } from '../../providers/dataservice';
import { SettingService } from '../../providers/settingservice';
import { Movie } from '../../models/movie';
import { Slide } from '../../models/slide';

import { MovieBasePage } from '../base/moviebasepage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends MovieBasePage {
  movies: Array<Movie> = [];
  newSlides: Slide[] = [];

  page: number = 0;
  appReady: boolean = false;
  imageBgSize: string = 'contain';

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController,
    private dataService: DataService, private appservice: AppService, public slideService: SlideService,
    private settingService: SettingService) {
    super(alertCtrl);
    this.initialize();
  }

  initialize() {
    this.platform.ready().then(() => {
      this.imageBgSize = this.appservice.isApp ? 'cover' : 'contain';
      this.dataService.connect().then(db => {
        this.appReady = true;
        this.slideService.getNewSlides(0).then(slides => {
          this.newSlides = slides;
          this.page += 1;
        });
      });
    });
  }

  selectMovie(movie: Movie) {
      this.navCtrl.push(DetailPage, { mov: movie });
  }

  searchToggle() {
    this.navCtrl.push(SearchPage);
  }

  reachLastSlide(type) {
    if (this.appReady && type == 'new' && this.newSlides.length <= this.settingService.SlideLimit) {
      this.slideService.getNewSlides(this.page).then(slides => {
        Array.prototype.push.apply(this.newSlides, slides);
        this.page += 1;
      });
    }
  }
}
