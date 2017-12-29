import { Movie } from '.././models/movie';

export interface IMovieService {
    loadNewMovies(page: number): Promise<Movie[]>;
    loadRandomMovies(): Promise<Movie[]>;
    loadRelatedMovies(imdbIds: string): Promise<Movie[]>;
    searchMovies(criteria: string, page: number) : Promise<Movie[]>;
    searchMoviesByCategory(criteria: string, page: number) : Promise<Movie[]>;
}