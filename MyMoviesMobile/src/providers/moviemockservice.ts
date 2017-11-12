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

        var mov: any = {
            MovieId: 1,
            ImdbId: 'tt0877641',
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
            RelatedMovie: 'tt0877642,tt0877643,tt0877644,tt0877645',
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
            RelatedMovie: '',
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
        mov = {
            MovieId: 3,
            ImdbId: 'tt0877643',
            Title: 'Wticher 3',
            Rate: 9.1,
            Runtime: '',
            Rating: 'R',
            DateReleased: 'string',
            Directors: 'geralt,yen,triss',
            Writers: 'ciri,doo,dlese',
            Stars: 'Rivia,Android,Sapkowsky',
            Summary: 'When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.',
            Genre: 'Adventure,Horror,Comedy',
            Year: '2015',
            RelatedMovie: '',
            Country: 'Poland',
            Language: 'English',
            AlsoKnownAs: 'The Hexer',
            Budget: '$139,000,000',
            Gross: '$403,706,375',
            DateCreated: new Date(),
            Location: 'Blue HD',
            Remarks: 'Test',
            FileName: 'test.mp4',
            FileSize: '1gb'
        };

        this.movies.push(new Movie(mov, '../../assets/'));
        mov = {
            MovieId: 4,
            ImdbId: 'tt0877644',
            Title: 'The Others',
            Rate: 6.9,
            Runtime: '',
            Rating: 'R',
            DateReleased: 'string',
            Directors: 'cawi,director1,hello',
            Writers: 'jona,writer1,doodle',
            Stars: 'Tobey Maguire,Kirsten Dunst,Willem Dafoe',
            Summary: 'When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.',
            Genre: 'Horror,Thriller',
            Year: '2001',
            RelatedMovie: '',
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
        mov = {
            MovieId: 5,
            ImdbId: 'tt0877645',
            Title: 'Avengers',
            Rate: 7.0,
            Runtime: '',
            Rating: 'R',
            DateReleased: 'string',
            Directors: 'cawi,director1,hello',
            Writers: 'jona,writer1,doodle',
            Stars: 'Thor,Captain America,Hulk',
            Summary: 'When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.',
            Genre: 'Action,Comedy',
            Year: '2017',
            RelatedMovie: 'tt0877644,tt0877643',
            Country: 'America',
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

    }

    loadNewMovies(page: number): Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mapMovie(this.movies));
        });
    }

    loadRelatedMovies(imdbIds: string): Promise<Movie[]> {
        return new Promise((resolve, reject) => {

            var foundMovies: Array<Movie> = [];
            if (imdbIds.length > 0) {
                var ids = imdbIds.split(",");
            }

            for (let id of ids) {
                var movie = this.movies.filter(x => x.ImdbId == id);
                if (movie != null && movie != undefined) {
                    foundMovies.push(movie[0]);
                }
            }


            resolve(this.mapMovie(foundMovies));
        });
    }

    searchMovies(criteria: string): Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            var lowerCriteria = criteria.toLowerCase();
            var result = this.movies.filter(x => x.Title.toLowerCase().indexOf(lowerCriteria) >= 0);
            resolve(this.mapMovie(result));
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