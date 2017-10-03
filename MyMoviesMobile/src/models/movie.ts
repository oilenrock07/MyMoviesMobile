const OBB_PATH :string = "content://com.lychee.mymovies/main_expansion/";

export class Movie {
    
    public Poster: string;
    
    constructor(public MovieId:number, public ImdbId: string, public MovieName: string) {
        this.Poster = "content://com.lychee.mymovies/main_expansion/" + ImdbId + ".jpg";
    }
}
