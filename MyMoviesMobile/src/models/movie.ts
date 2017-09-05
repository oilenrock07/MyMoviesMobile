export class Movie {
    MovieName:string;
    ImdbId:string;
    Poster:string;

    constructor(fields?: {MovieName?: string, ImdbId?: string, Poster?: string}) {
        if (fields)
            Object.assign(this, fields);
    }
}
