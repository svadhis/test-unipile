import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const MoviePicks = () => {
    const moviePicks = useSelector((state: RootState) => state.moviePicks.value);

    return (
        <ul>
            {[...moviePicks].sort((a, b) => a.localeCompare(b)).map(pick => <li key={pick}>{pick}</li>)}
        </ul>
    );
}