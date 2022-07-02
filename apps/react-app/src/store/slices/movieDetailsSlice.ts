import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FullMovie } from '../../entities/Movie'
import { Omdb } from '../../services/Omdb'
import { LoadingState } from '../../utilities/LoadingState'
import { setErrorMessage } from './errorSlice'

export interface MovieDetailsState {
  value: FullMovie | undefined,
  visible: boolean,
  loading: LoadingState
}

const initialState: MovieDetailsState = {
  value: undefined,
  visible: false,
  loading: LoadingState.idle,
}

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    hideMovieDetails: (state) => {
      state.visible = false;
      state.value = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.fulfilled, (state, action: PayloadAction<FullMovie | undefined>) => {
      state.value = action.payload;
      state.loading = LoadingState.idle;
    }),
    builder.addCase(getMovie.pending, (state) => {
      state.visible = true;
      state.loading = LoadingState.pending;
    })
    builder.addCase(getMovie.rejected, (state) => {
      state.visible = false;
      state.loading = LoadingState.idle;
    })
  },
})

export const { hideMovieDetails } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;

export const getMovie = createAsyncThunk(
  'getMovie',
  async (query: string, {dispatch}) => {
    try {
      const omdb = new Omdb();
      const movie = await omdb.getMovie(query);
      return movie;
    } catch (error) {
      dispatch(setErrorMessage(error as Error))
      throw error
    }
  }
)