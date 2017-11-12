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

    loadNewMovies(page: number): Promise<Movie[]> {
        var max = this.settingService.MaximumMovieRequest;
        var offset = page * max;
        var query = "SELECT * FROM Movies WHERE MovieId ORDER BY MovieId DESC LIMIT ? OFFSET ?";
        return this.dataService.executeSql(query, [max, offset])
            .then(resultSet => this.mapMovie(resultSet));
    }

    loadRelatedMovies(imdbIds: string): Promise<Movie[]> {
        var formattedParameter = "'" + imdbIds + "'";
        if (formattedParameter.indexOf(',') > 0)
        formattedParameter = formattedParameter.replace(new RegExp(',', 'g'), "','");

        var query = "SELECT * FROM Movies WHERE ImdbId IN (" + formattedParameter + ")";
        return this.dataService.executeSql(query, null)
            .then(resultSet => this.mapMovie(resultSet));
    }

    searchMovies(criteria: string): Promise<Movie[]> {
        criteria = "'%" + criteria + "%'";
        var query = `SELECT DISTINCT * FROM Movies WHERE Title LIKE ${criteria} OR Directors LIKE ${criteria} OR Writers LIKE ${criteria} OR Stars LIKE ${criteria} OR Genre LIKE ${criteria} ` +
            `OR AlsoKnownAs LIKE ${criteria} OR FileName LIKE ${criteria}`;

        return this.dataService.executeSql(query, [])
            .then(resultSet => this.mapMovie(resultSet));
    }

    searchMoviesByCategory(criteria: string) : Promise<Movie[]> {
        return null;
    }

    // addToWatchList(movieId: number) : Promise {
    //     var query = "INSERT INTO WatchList WHERE MovieId"
    //     return this.dataService.executeSql()
    // }

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