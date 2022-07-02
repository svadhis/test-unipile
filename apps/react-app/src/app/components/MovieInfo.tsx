import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { BasicMovie } from "../../entities/Movie";
import { getMovie } from "../../store/slices/movieDetailsSlice";

export const MovieInfo = ({movie}: MovieInfoProps) => {
    const dispatch = useDispatch();

    const showDetails = async (imdbID: string): Promise<void> => {
        dispatch(getMovie(imdbID));
    }

    return (
        <ListItem button onClick={() => showDetails(movie.imdbID)}>
            <ListItemAvatar>
                <img src={movie.poster} alt="" />
            </ListItemAvatar>
            <ListItemText primary={movie.title} secondary={movie.year}/>
        </ListItem>
    );
}

interface MovieInfoProps {
    movie: BasicMovie
}
