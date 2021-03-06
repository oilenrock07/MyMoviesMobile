import { Injectable } from '@angular/core';
import { MovieService } from './movieservice';
import { MovieMockService } from './moviemockservice';
import { AppService } from './appservice';
import { Slide } from '../models/slide';


import { IMovieService } from '../interfaces/imovieservice'

@Injectable()
export class SlideService {

    private readonly _movieService: IMovieService;
    slides: any[] = [];

    constructor(private moviesService: MovieService, private movieMockService: MovieMockService, private appService: AppService) {
        this._movieService = appService.isApp ? moviesService : movieMockService;
    }

    getNewSlides(page: number): Promise<Slide[]> {
        return this._movieService.loadNewMovies(page).then((movies) => {
            return this.prepareSlide(movies);
        });
    }

    getRandomSlides(): Promise<Slide[]> {
        return this._movieService.loadRandomMovies().then((movies) => {
            return this.prepareSlide(movies);
        });
    }

    getRelatedMovies(imdbIds: string): Promise<Slide[]> {
        return this._movieService.loadRelatedMovies(imdbIds).then((movies) => {
            return this.prepareSlide(movies);
        });
    }

    //Arrange the movie on each slides.
    //Display 3 movies on each slide
    private prepareSlide(movies: any) {
        var ctr: number = 3;
        var index: number = -1;

        var slideList: Array<Slide> = [];

        for (let movie of movies) {
            if ((ctr % 3) == 0) {
                slideList.push(new Slide());
                index++;
            }

            slideList[index].Movies.push(movie);
            ctr++;
        }

        return slideList;
    }
}