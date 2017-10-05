import { Injectable } from '@angular/core';
import { Movie } from '.././models/movie';
import { DataService } from '../providers/dataservice';
import { SettingService } from '../providers/settingservice';
import { IMovieService } from '../interfaces/imovieservice'

@Injectable()
export class MovieMockService implements IMovieService {
    //for testing only
    movies: Array<Movie> = [];

    constructor(public dataService: DataService, public settingService: SettingService) {

        for (var i = 1; i <= 12; i++) {
            var mov: any = {
                MovieId: i,
                ImdbId: 'test',
                Title: 'Spider Man',
                Rate: 7.5,
                Runtime: '',
                Rating: '',
                DateReleased: 'string',
                Directors: 'cawi',
                Writers: 'jona',
                Stars: 'third',
                Summary: 'test summary',
                Genre: 'Horror,Comedy',
                Year: '2017',
                RelatedMovies: '',
                Country: 'Philippines',
                Language: '',
                AlsoKnownAs: 'tae tae tae',
                Budget: '',
                Gross: '',
                DateCreated: new Date(),
                Location: 'Blue HD',
                Remarks: 'Test',
                FileName: 'test.mp4',
                FileSize: '1gb'
            };

            this.movies.push(new Movie(mov));
        }

    }

    loadNewMovies(lastMovieId: number): Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mapMovie(this.movies));
        });
    }

    private mapMovie(moviesObj: any): Array<Movie> {
        var movieList: Array<Movie> = [];
        try {
            for (let movie of moviesObj) {
                movieList.push(new Movie(movie));
            }
        }
        catch (ex) {
            alert('Error mapping movie: ' + ex);
        }
        return movieList;
    }
}