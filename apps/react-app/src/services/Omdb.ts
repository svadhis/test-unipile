import { BasicMovie, BasicMovieData, FullMovie, Movie, FullMovieData } from "../entities/Movie";
import locals from "../locals";

enum OmdbRequestType {
    searchMovies,
    getMovie
}

export class Omdb {
    private apiKey: string;

    constructor() {
        const apiKey = locals.API_KEY;
        if (typeof apiKey === 'undefined')
            throw new Error('Aucune clé API configurée')

        this.apiKey = apiKey;
    }

    private async getRequest(query: string, type: OmdbRequestType): Promise<unknown> {
        let queryParameter: string;
        switch (type) {
            case OmdbRequestType.searchMovies:
                queryParameter = 's'
                break;

            case OmdbRequestType.getMovie:
                queryParameter = 'i'
                break;

            default:
                queryParameter = 's'
                break;
        }

        const response = await fetch(`http://www.omdbapi.com/?${queryParameter}=${query}&apikey=${this.apiKey}`);

        if (response.status !== 200)
            throw new Error('Il y a eu une erreur lors de la requête : ' + response.statusText);

        const data = response.json();

        if (isFailedRequest(data))
            throw new Error(data.Error)

        return data;
    }

    public async searchMovies(query: string): Promise<BasicMovie[]> {
        const movieSearchResult = await this.getRequest(query, OmdbRequestType.searchMovies);

        if (!isMovieSearchResult(movieSearchResult))
            throw new Error('Erreur dans le format de recherche de films reçu');

        return movieSearchResult.Search.map(movieData => Movie.createBasicMovie(movieData));
    }

    public async getMovie(imdbID: string): Promise<FullMovie> {
        const movieData = await this.getRequest(imdbID, OmdbRequestType.getMovie);

        if (!isMovieData(movieData))
            throw new Error('Erreur dans le format de film reçu');

        return Movie.createFullMovie(movieData);
    }
}

function isFailedRequest(json: unknown): json is FailedRequest {
    return ['Response', 'Error'].every(key => key in (json as FailedRequest));
}

function isMovieSearchResult(json: unknown): json is MovieSearchResult {
    return ['Response', 'Search'].every(key => key in (json as MovieSearchResult));
}

function isMovieData(json: unknown): json is FullMovieData {
    return ['Title', 'Year', 'imdbID', 'Type', 'Poster', 'Plot', 'Actors'].every(key => key in (json as FullMovieData));
}

type MovieSearchResult = {
    Response: true;
    Search: BasicMovieData[];
}

type FailedRequest = {
    Response: false;
    Error: string;
}