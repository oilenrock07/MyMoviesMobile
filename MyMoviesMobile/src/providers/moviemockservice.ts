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
        
        // for (var i = 1; i <= 12; i++) {
            var mov: any = {
                MovieId: 1,
                ImdbId: 'test',
                Title: 'Spider Man',
                Rate: 4.3,
                Runtime: '2hr 1m',
                Rating: 'PG13',
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

            this.movies.push(new Movie(mov, '../../assets/'));
            mov = {
                MovieId: 2,
                ImdbId: 'tt0877642',
                Title: 'Wag kang lilingon',
                Rate: 8.9,
                Runtime: '',
                Rating: 'R',
                DateReleased: 'string',
                Directors: 'cawi,director1,hello',
                Writers: 'jona,writer1,doodle',
                Stars: 'Tobey Maguire,Kirsten Dunst,Willem Dafoe',
                Summary: 'When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.',
                Genre: 'Horror,Comedy',
                Year: '2017',
                RelatedMovies: '',
                Country: 'Philippines',
                Language: 'English',
                AlsoKnownAs: 'El hombre araña',
                Budget: '$139,000,000',
                Gross: '$403,706,375',
                DateCreated: new Date(),
                Location: 'Blue HD',
                Remarks: 'Test',
                FileName: 'test.mp4',
                FileSize: '1gb'
             };

            this.movies.push(new Movie(mov, '../../assets/'));
        //}

    }

    loadNewMovies(page: number): Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mapMovie(this.movies));
        });
    }

    private mapMovie(moviesObj: any): Array<Movie> {
        var movieList: Array<Movie> = [];
        try {
            for (let movie of moviesObj) {
                movieList.push(movie);
            }
        }
        catch (ex) {
            alert('Error mapping movie: ' + ex);
        }
        return movieList;
    }
}