import { Movie } from '.././models/movie';

export interface IMovieService {
    loadNewMovies(page: number): Promise<Movie[]>;
    loadRelatedMovies(imdbIds: string): Promise<Movie[]>;
    searchMovies(criteria: string) : Promise<Movie[]>;
    searchMoviesByCategory(criteria: string) : Promise<Movie[]>;
}