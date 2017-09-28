import { Injectable } from '@angular/core';
import { Movie } from '.././models/movie';

@Injectable()
export class MovieService {
    //for testing only
    movies: Array<Movie> = [];

    constructor() {
        //for testing only
        this.movies.push(new Movie(1,"1234", "Spider Man",  ""));
        this.movies.push(new Movie(2, "1234", "Spider Man 2",""));
        this.movies.push(new Movie(3, "1234", "Spider Man 3",  ""));
        this.movies.push(new Movie(4, "4321", "Spider Man 4",  ""));
        this.movies.push(new Movie(5, "9987", "Spider Man 5",  ""));
    }

    loadNewMovies(lastMovieId: number) : Promise<Movie[]> {
        return new Promise(resolve => {        
            resolve(this.movies.slice(lastMovieId, 4));
        });
    }
}