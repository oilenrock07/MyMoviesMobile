import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicImageLoader } from 'ionic-image-loader';

import { AppService } from '../providers/appservice';
import { SlideService } from '../providers/slideservice';
import { MovieService } from '../providers/movieservice';
import { DataService } from '../providers/dataservice';
import { SettingService } from '../providers/settingservice';
import { MovieMockService } from '../providers/moviemockservice';
import { WatchListMockService } from '../providers/watchlistmockservice';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { DetailPage } from '../pages/detail/detail';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { WatchListPage } from '../pages/watchlist/watchlist';
import { ModalWatchListPage } from '../pages/watchlist/watchlist';

import { IMovieService } from '../interfaces/imovieservice'
import { IWatchListService } from '../interfaces/iwatchlistservice'

import { StarRating } from '../components/starrating';
import { RatingPipe } from '../pipes/ratingpipe';
import { CallbackPipe } from '../pipes/callbackpipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    DetailPage,
    CategoriesPage,
    CategoryPage,
    WatchListPage,
    ModalWatchListPage,
    StarRating,
    RatingPipe,
    CallbackPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    DetailPage,
    CategoriesPage,
    CategoryPage,
    WatchListPage,
    ModalWatchListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppService,
    MovieService,
    DataService,
    SlideService,
    SettingService,
    MovieMockService,
    WatchListMockService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
