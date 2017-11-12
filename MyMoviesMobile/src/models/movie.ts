export class Movie {
    public MovieId: number;
    public Poster: string;
    public Title:string;
    public ImdbId:string;
    public Rate:number;
    public Runtime: string;
    public Rating: string;
    public DateReleased: string;
    public Directors: string;
    public Writers: string;
    public Stars: string;
    public Summary: string;
    public Genre: string;
    public Year: string;
    public RelatedMovie: string;
    public Country: string;
    public Language: string;
    public AlsoKnownAs: string;
    public Budget: string;
    public Gross: string;
    public DateCreated: Date;
    public Location: string;
    public Remarks: string;
    public FileName: string;
    public FileSize: string;


    constructor(fields?: { MovieId: number, 
        ImdbId: string, 
        Title?: string,
        Rate:number,
        Runtime: string,
        Rating: string,
        DateReleased: string,
        Directors: string,
        Writers: string,
        Stars: string,
        Summary: string,
        Genre: string,
        Year: number,
        RelatedMovies: string,
        Country: string,
        Language: string,
        AlsoKnownAs: string,
        Budget: string,
        Gross: string,
        DateCreated: Date,
        Location: string,
        Remarks: string,
        FileName: string,
        FileSize: string }, posterPath ?: string) {
        if (fields) Object.assign(this, fields);

        if (posterPath == undefined)
            posterPath = 'content://com.lychee.mymovies/main_expansion/';
        this.Poster = posterPath + fields.ImdbId + ".jpg";
    }

    formatText(field: string) : string {
        if (field != undefined) {
            if (field.indexOf(',') > 0)
                return field.replace(new RegExp(',', 'g'), ', ');

            return field;
        }

        return '';
    }
}
