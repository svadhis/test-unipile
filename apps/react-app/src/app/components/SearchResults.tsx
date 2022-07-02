import { CircularProgress, List } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LoadingState } from "../../utilities/LoadingState";
import { MovieInfo } from "./MovieInfo";

export const SearchResults = () => {
    const movieList = useSelector((state: RootState) => state.movieList);

    return (
        <div>
            {
                movieList.loading === LoadingState.pending ?
                <CircularProgress className="loading" />
                : <List className='movie-list'>
                    {movieList.value.map(movie => (
                        <MovieInfo key={movie.imdbID} movie={movie} />
                    ))}
                </List>
            }
        </div>
    );
}