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

    loadRandomMovies(): Promise<Movie[]> {
        var max = this.settingService.MaximumMovieRequest;
        var query = "SELECT * FROM Movies ORDER BY RANDOM() LIMIT ?";
        return this.dataService.executeSql(query, [max])
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

    searchMovies(criteria: string, page: number): Promise<Movie[]> {
        criteria = "'%" + criteria + "%'";
        var query = `SELECT DISTINCT * FROM Movies WHERE Title LIKE ${criteria} OR Directors LIKE ${criteria} OR Writers LIKE ${criteria} OR Stars LIKE ${criteria} OR Genre LIKE ${criteria} ` +
            `OR AlsoKnownAs LIKE ${criteria} OR FileName LIKE ${criteria} ORDER BY MovieId DESC LIMIT ? OFFSET ?`;

        var max = this.settingService.MaximumMovieRequest;
        var offset = page * max;
        return this.dataService.executeSql(query, [max, offset])
            .then(resultSet => this.mapMovie(resultSet));
    }

    searchMoviesByCategory(criteria: string, page: number) : Promise<Movie[]> {
        var query = `SELECT DISTINCT * FROM Movies WHERE Genre LIKE '%${criteria}%' ORDER BY MovieId DESC LIMIT ? OFFSET ?`;

        var max = this.settingService.MaximumMovieRequest;
        var offset = page * max;
        return this.dataService.executeSql(query, [max, offset])
            .then(resultSet => this.mapMovie(resultSet));
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