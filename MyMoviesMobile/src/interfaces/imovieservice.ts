import { Movie } from '.././models/movie';

export interface IMovieService {
    loadNewMovies(lastMovieId: number): Promise<Movie[]>;
}