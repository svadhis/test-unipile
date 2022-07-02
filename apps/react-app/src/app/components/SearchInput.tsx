import { TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../../store/slices/movieListSlice";

export const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');

    let timer = useRef<number | undefined>(undefined);

    const dispatch = useDispatch();

    const updateQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const query = e.target.value;
        setSearchQuery(query);
    }

    useEffect(() => {
        window.clearTimeout(timer.current);
        if (searchQuery.length === 0) return;

        timer.current = window.setTimeout(() => {
            dispatch(searchMovies(searchQuery));
        }, 1000)
    }, [searchQuery])

    return (
        <TextField id="outlined-basic" className="search-input" label="Recherche" variant="outlined" value={searchQuery} onChange={updateQuery} />
    );
}
