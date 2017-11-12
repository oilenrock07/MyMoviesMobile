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

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { DetailPage } from '../pages/detail/detail';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';

import { IMovieService } from '../interfaces/imovieservice'

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
    CategoryPage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
