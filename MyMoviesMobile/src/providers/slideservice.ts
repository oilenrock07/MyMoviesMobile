import { Injectable } from '@angular/core';
import { MovieService } from './movieservice';
import { MovieMockService } from './moviemockservice';
import { AppService } from './appservice';
import { Slide } from '../models/slide';


import { IMovieService } from '../interfaces/imovieservice'

@Injectable()
export class SlideService {

    private readonly _movieService : IMovieService;
    slides : any[] = [];
    
    constructor(private moviesService: MovieService, private movieMockService: MovieMockService, private appService: AppService) {
        this._movieService = appService.isApp ? moviesService :  movieMockService;        
    }

    getNewSlides(lastMovieId: number) : Promise<Slide[]> {
        return this._movieService.loadNewMovies(lastMovieId).then((movies) => {
            var ctr : number = 3;
            var index : number = -1;

            var slideList : Array<Slide> = [];

            for(let movie of movies) {
                if ((ctr % 3) == 0) {                    
                    slideList.push(new Slide());  
                    index++;                  
                }

                slideList[index].Movies.push(movie);
                ctr++;
            }

            return slideList;
        });
    }

    getRandomMovieSlides() {

    }
}