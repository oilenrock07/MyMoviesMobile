import { Injectable } from '@angular/core';
import { Movie } from '.././models/movie';
import { DataService } from '../providers/dataservice';
import { SettingService } from '../providers/settingservice';

@Injectable()
export class MovieService {
    //for testing only
    movies: Array<Movie> = [];

    constructor(public dataService: DataService, public settingService: SettingService) {
        //for testing only
        this.movies.push(new Movie(1, "1234", "Spider Man"));
        this.movies.push(new Movie(2, "1234", "Spider Man 2"));
        this.movies.push(new Movie(3, "1234", "Spider Man 3"));
        this.movies.push(new Movie(4, "4321", "Spider Man 4"));
        this.movies.push(new Movie(5, "9987", "Spider Man 5"));
        this.movies.push(new Movie(6, "1234", "Spider Man 6"));
        this.movies.push(new Movie(7, "1234", "Spider Man 7"));
        this.movies.push(new Movie(8, "1234", "Spider Man 8"));
        this.movies.push(new Movie(9, "4321", "Spider Man 9"));
        this.movies.push(new Movie(10, "9987", "Spider Man 10"));
    }

    loadNewMovies(lastMovieId: number): Promise<Movie[]> {
        var query = "SELECT * FROM Movies WHERE MovieId > ? LIMIT ?";
        return this.dataService.executeSql(query, [lastMovieId, this.settingService.MaximumMovieRequest])
            .then(resultSet => this.mapMovie(resultSet));
    }

    private mapMovie(moviesObj: any): Array<Movie> {
        var movieList: Array<Movie> = [];
        try {
            for (var i = 0; i < moviesObj.rows.length; i++) {
                var movie = moviesObj.rows.item(i);
                movieList.push(new Movie(movie.MovieId, movie.ImdbId, movie.Title));
            }
        }
        catch (ex) {
            alert(ex);
        }
        return movieList;
    }
}