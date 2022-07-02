import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@material-ui/core';
import { RootState } from '../store/store';
import { hideMovieDetails } from '../store/slices/movieDetailsSlice';
import { getPicks } from '../store/slices/moviePicksSlice';
import { ErrorAlert } from './components/ErrorAlert';
import { MovieDetailsCard } from './components/MovieDetailsCard';
import { MoviePicks } from './components/MoviePicks';
import { SearchResults } from './components/SearchResults';
import './app.scss';
import { SearchInput } from './components/SearchInput';

export const App = () => {
  const movieDetails = useSelector((state: RootState) => state.movieDetails);

  const dispatch = useDispatch();

  const hideDetails = async (): Promise<void> => {
    dispatch(hideMovieDetails());
  }

  useEffect(() => {
    dispatch(getPicks());
  }, [])

  return <div className="app">
    <header>
      <h1>MoviePicker</h1>
    </header>
    <main>
      <SearchInput />
      <SearchResults />

      <details>
        <summary>
          Favoris
        </summary>
        <MoviePicks />
      </details>

      <Modal
        className='modal'
        open={movieDetails.visible}
        onClose={hideDetails}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <MovieDetailsCard />
      </Modal>

      <ErrorAlert />
    </main>
  </div>;
};

export default App;