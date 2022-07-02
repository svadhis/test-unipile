export abstract class Movie {
    public title: string;
    public year: number;
    public imdbID: string;
    public type: string;
    public poster: string;

    constructor({ Title, Year, imdbID, Type, Poster }: BasicMovieData) {
        this.title = Title;
        this.year = Year;
        this.imdbID = imdbID;
        this.type = Type;
        this.poster = Poster;
    }

    static createBasicMovie(data: BasicMovieData): BasicMovie {
        return new BasicMovie(data);
    }

    static createFullMovie(data: FullMovieData): FullMovie {
        return new FullMovie(data);
    }
}

export class BasicMovie extends Movie {
    constructor(data: BasicMovieData) {
        super(data);
    }
}
export class FullMovie extends Movie {
    public synopsis: string;
    public actors: string[];

    constructor(data: FullMovieData) {
        super(data);
        this.synopsis = data.Plot;
        this.actors = data.Actors.split(', ');
    }
}

export interface BasicMovieData {
    Title: string;
    Year: number;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface FullMovieData {
    Title: string;
    Year: number;
    imdbID: string;
    Type: string;
    Poster: string;
    Plot: string;
    Actors: string;
}
