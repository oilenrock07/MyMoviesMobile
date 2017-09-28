import { Injectable } from '@angular/core';
import { MovieService } from './movieservice';
import { Slide } from '../models/slide';

@Injectable()
export class SlideService {

    slides : any[] = [];
    slidesReturnCount :number = 10;

    constructor(private moviesService: MovieService) {
        
    }

    getNewSlides(lastMovieId: number) : Promise<Array<Slide[]>> {
        return this.moviesService.loadNewMovies(lastMovieId).then((movies) => {
            var ctr : number = 3;
            var index : number = -1;

            var slideList = [];

            for(let movie of movies) {
                if ((ctr % 3) == 0) {                    
                    slideList.push(new Array<Slide>());  
                    index++;                  
                }

                slideList[index].push(movie);
                ctr++;
            }

            return slideList;
        });
    }

    getRandomMovieSlides() {

    }
}