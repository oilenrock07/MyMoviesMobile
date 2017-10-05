import { Injectable } from '@angular/core';
import { Movie } from '.././models/movie';
import { DataService } from '../providers/dataservice';
import { SettingService } from '../providers/settingservice';
import { IMovieService } from '../interfaces/imovieservice'

@Injectable()
export class MovieService implements IMovieService {
    //for testing only
    movies: Array<Movie> = [];

    constructor(public dataService: DataService, public settingService: SettingService) {
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
                movieList.push(new Movie(movie));
            }
        }
        catch (ex) {
            alert(ex);
        }
        return movieList;
    }
}